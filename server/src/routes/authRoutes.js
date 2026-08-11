import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import EmailVerificationToken from '../models/EmailVerificationToken.js';
import User from '../models/User.js';
import { countUsers, createUser, findUserByEmail, isMongoReady } from '../services/store.js';
import { sendPasswordResetLink, sendVerificationCode } from '../services/emailService.js';

const router = Router();

const CODE_TTL_MS = 10 * 60 * 1000;
const memoryTokens = new Map();

function publicUser(user) {
  return { name: user.name, email: user.email, role: user.role, isEmailVerified: Boolean(user.isEmailVerified) };
}

function hashCode(code) {
  return crypto.createHash('sha256').update(code).digest('hex');
}

function createSession(user) {
  const token = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '7d' }
  );
  return { user: publicUser(user), token };
}

function tokenKey(userId, purpose) {
  return `${userId}:${purpose}`;
}

async function sendCode(user, purpose, extra = {}) {
  const code = String(crypto.randomInt(100000, 1000000));
  const userId = String(user.id || user._id);
  const token = {
    userId,
    purpose,
    token: hashCode(code),
    ...extra,
    expiresAt: new Date(Date.now() + CODE_TTL_MS)
  };
  if (isMongoReady()) {
    await EmailVerificationToken.deleteMany({ userId, purpose });
    await EmailVerificationToken.create(token);
  } else {
    memoryTokens.set(tokenKey(userId, purpose), token);
  }
  try {
    await sendVerificationCode({ to: user.email, code, purpose });
  } catch (error) {
    if (isMongoReady() || (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD)) throw error;
    console.warn(`[dev auth] ${purpose} code for ${user.email}: ${code}`);
    return code;
  }
  return null;
}

function verificationResponse(user, purpose, status = 200, developmentCode = null) {
  return {
    status,
    body: {
      requiresVerification: true,
      email: user.email,
      role: user.role,
      purpose,
      message: developmentCode ? 'Email is not configured. Use the local development code shown below.' : 'A six-digit verification code was sent to your email.',
      ...(developmentCode ? { developmentCode } : {})
    }
  };
}

router.post('/register', async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (password.length < 8 || !/\d/.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters with one number' });
  }
  const existing = await findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashed = bcrypt.hashSync(password, 10);
  const user = await createUser({ name, email, password: hashed, role: 'user', isEmailVerified: false });
  const developmentCode = await sendCode(user, 'register');
  const response = verificationResponse(user, 'register', 201, developmentCode);
  res.status(response.status).json(response.body);
});

router.post('/setup-admin', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (password.length < 8 || !/\d/.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters with one number' });
  }

  const adminCount = await countUsers({ role: 'admin' });
  if (adminCount > 0) {
    return res.status(409).json({ message: 'Admin setup is already complete' });
  }

  const existing = await findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashed = bcrypt.hashSync(password, 10);
  const user = await createUser({ name, email, password: hashed, role: 'admin', isEmailVerified: false });
  const developmentCode = await sendCode(user, 'setup-admin');
  const response = verificationResponse(user, 'setup-admin', 201, developmentCode);
  res.status(response.status).json(response.body);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  const user = await findUserByEmail(email);
  const passwordMatches = user && bcrypt.compareSync(password, user.password);
  if (!passwordMatches) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const developmentCode = await sendCode(user, 'login');
  const response = verificationResponse(user, 'login', 200, developmentCode);
  res.json(response.body);
});

router.post('/verify-email', async (req, res) => {
  const { email, code, purpose } = req.body;
  if (!email || !code || !purpose) {
    return res.status(400).json({ message: 'Email, verification code, and purpose are required' });
  }

  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'Account not found' });

  const token = isMongoReady()
    ? await EmailVerificationToken.findOne({ userId: String(user.id), purpose, expiresAt: { $gt: new Date() } }).sort({ createdAt: -1 })
    : memoryTokens.get(tokenKey(String(user.id), purpose));

  if (!token || token.token !== hashCode(String(code).trim())) {
    return res.status(400).json({ message: 'Invalid or expired verification code' });
  }

  if (isMongoReady()) {
    await Promise.all([
      EmailVerificationToken.deleteMany({ userId: String(user.id), purpose }),
      User.findByIdAndUpdate(user.id, { isEmailVerified: true })
    ]);
  } else {
    memoryTokens.delete(tokenKey(String(user.id), purpose));
    user.isEmailVerified = true;
  }
  const verifiedUser = { ...user, isEmailVerified: true };
  res.json(createSession(verifiedUser));
});

router.post('/resend-code', async (req, res) => {
  const { email, purpose } = req.body;
  if (!email || !purpose) {
    return res.status(400).json({ message: 'Email and purpose are required' });
  }

  const user = await findUserByEmail(email);
  if (!user) return res.status(404).json({ message: 'Account not found' });
  const developmentCode = await sendCode(user, purpose);
  res.json({ message: developmentCode ? `Use local development code: ${developmentCode}` : 'A new verification code was sent to your email.' });
});

router.post('/forgot-password', async (req, res, next) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await findUserByEmail(email);
    // Always return the same response so this endpoint does not reveal whether an account exists.
    if (user) {
      const rawToken = crypto.randomBytes(32).toString('hex');
      await EmailVerificationToken.deleteMany({ userId: String(user.id || user._id), purpose: 'reset-password' });
      await EmailVerificationToken.create({
        userId: String(user.id || user._id),
        purpose: 'reset-password',
        token: hashCode(rawToken),
        expiresAt: new Date(Date.now() + CODE_TTL_MS)
      });
      const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
      const resetUrl = `${clientUrl}/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;
      await sendPasswordResetLink({ to: email, resetUrl });
    }
    res.json({
      email,
      message: 'If an account exists for that email, a password reset link has been sent.'
    });
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', async (req, res, next) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const tokenValue = String(req.body.token || '').trim();
  const password = String(req.body.password || '');

  if (!email || !tokenValue || password.length < 8 || !/\d/.test(password)) {
    return res.status(400).json({ message: 'Use a valid reset link and a password with at least 8 characters and one number' });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid or expired password reset code' });

    const token = await EmailVerificationToken.findOne({
      userId: String(user.id || user._id),
      purpose: 'reset-password',
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });

    if (!token || token.token !== hashCode(tokenValue)) {
      return res.status(400).json({ message: 'Invalid or expired password reset code' });
    }

    await Promise.all([
      User.findByIdAndUpdate(user.id, {
        $set: { password: bcrypt.hashSync(password, 10) },
        $unset: { resetPasswordToken: 1, resetPasswordExpires: 1 }
      }),
      EmailVerificationToken.deleteMany({ userId: String(user.id || user._id), purpose: 'reset-password' })
    ]);
    res.json({ message: 'Password changed successfully. You can now log in.' });
  } catch (error) {
    next(error);
  }
});

export default router;
