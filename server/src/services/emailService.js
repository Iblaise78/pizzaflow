import nodemailer from 'nodemailer';

function getTransporter() {
  const { EMAIL_USER, EMAIL_APP_PASSWORD } = process.env;
  if (!EMAIL_USER || !EMAIL_APP_PASSWORD) {
    throw new Error('Email is not configured. Add EMAIL_USER and EMAIL_APP_PASSWORD to server/.env.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_APP_PASSWORD }
  });
}

export async function sendVerificationCode({ to, code, purpose }) {
  const transporter = getTransporter();
  const action = purpose === 'login'
    ? 'sign in to your account'
    : purpose === 'reset-password'
      ? 'reset your PizzaFlow password'
      : 'verify your PizzaFlow account';

  await transporter.sendMail({
    from: `PizzaFlow <${process.env.EMAIL_USER}>`,
    to,
    subject: purpose === 'reset-password' ? 'Your PizzaFlow password reset code' : 'Your PizzaFlow verification code',
    text: `Your PizzaFlow code is ${code}. Use it to ${action}. It expires in 10 minutes.`,
    html: `<div style="font-family:Arial,sans-serif;color:#1d1d1d"><h2>PizzaFlow verification</h2><p>Use this code to ${action}:</p><p style="font-size:28px;font-weight:700;letter-spacing:6px;color:#e63946">${code}</p><p>This code expires in 10 minutes. Do not share it with anyone.</p></div>`
  });
}

export async function sendPasswordResetLink({ to, resetUrl }) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `PizzaFlow <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset your PizzaFlow password',
    text: `Use this link to reset your PizzaFlow password: ${resetUrl}. This link expires in 10 minutes.`,
    html: `<div style="font-family:Arial,sans-serif;color:#1d1d1d"><h2>Password reset</h2><p>Click the button below to choose a new PizzaFlow password.</p><p><a href="${resetUrl}" style="display:inline-block;padding:12px 18px;border-radius:8px;color:#fff;background:#e63946;text-decoration:none">Reset password</a></p><p>This link expires in 10 minutes. If you did not request this, you can ignore this email.</p></div>`
  });
}

export async function sendLowStockAlert({ to, items }) {
  const transporter = getTransporter();
  const rows = items.map((item) => `<li><strong>${item.name}</strong>: ${item.stock} remaining (alert at ${item.threshold})</li>`).join('');
  await transporter.sendMail({
    from: `PizzaFlow <${process.env.EMAIL_USER}>`,
    to,
    subject: `PizzaFlow low-stock alert (${items.length} item${items.length === 1 ? '' : 's'})`,
    text: items.map((item) => `${item.name}: ${item.stock} remaining; alert at ${item.threshold}`).join('\n'),
    html: `<div style="font-family:Arial,sans-serif;color:#1d1d1d"><h2>Low-stock alert</h2><p>These inventory items need attention:</p><ul>${rows}</ul><p>Open the PizzaFlow admin dashboard to update stock.</p></div>`
  });
}
