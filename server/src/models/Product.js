import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: [{ type: String }],
    price: { type: Number, required: true },
    size: { type: String, required: true },
    crust: { type: String, required: true },
    availability: { type: Boolean, default: true },
    isAlcoholic: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    imageUrls: { type: [String], default: [] },
    createdBy: String,
    updatedBy: String,
    imageMeta: {
      mimeType: String,
      size: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
