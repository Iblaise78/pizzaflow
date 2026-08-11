import mongoose from 'mongoose';

const deliveryAddressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    fullName: String,
    phone: String,
    address: String,
    city: String,
    notes: String
  },
  { timestamps: true }
);

export default mongoose.model('DeliveryAddress', deliveryAddressSchema);

