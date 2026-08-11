import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    userId: { type: String, required: true },
    method: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['created', 'verified', 'failed'], default: 'created' },
    providerRef: String
  },
  { timestamps: true }
);

export default mongoose.model('Payment', paymentSchema);

