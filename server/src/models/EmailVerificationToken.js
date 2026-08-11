import mongoose from 'mongoose';

const emailVerificationTokenSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    token: { type: String, required: true },
    pendingPasswordHash: { type: String },
    purpose: { type: String, enum: ['register', 'login', 'setup-admin', 'reset-password'], required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
);

export default mongoose.model('EmailVerificationToken', emailVerificationTokenSchema);
