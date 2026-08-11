import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    title: String,
    quantity: Number,
    total: Number
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [cartItemSchema]
  },
  { timestamps: true }
);

export default mongoose.model('Cart', cartSchema);

