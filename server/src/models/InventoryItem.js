import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema(
  {
    _id: { type: String },
    type: { type: String, required: true },
    name: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    threshold: { type: Number, required: true, default: 20 },
    isAvailable: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model('InventoryItem', inventoryItemSchema);
