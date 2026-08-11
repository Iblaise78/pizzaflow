import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ctaLabel: String,
    ctaHref: String,
    isActive: { type: Boolean, default: true },
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true }
);

export default mongoose.model('Banner', bannerSchema);
