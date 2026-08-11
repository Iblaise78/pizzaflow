import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Banner from '../src/models/Banner.js';
import Product from '../src/models/Product.js';
import User from '../src/models/User.js';
import { bannerSeed, productSeed } from '../src/data/catalogSeed.js';

dotenv.config({ path: new URL('../.env', import.meta.url).pathname });

async function populate() {
  if (!process.env.MONGO_URI) throw new Error('MONGO_URI is not configured');
  await mongoose.connect(process.env.MONGO_URI);

  const [productCount, bannerCount, admin] = await Promise.all([
    Product.countDocuments(),
    Banner.countDocuments(),
    User.findOne({ role: 'admin' }).sort({ createdAt: 1 }).lean()
  ]);

  if (productCount > 0 || bannerCount > 0) {
    throw new Error('Catalog already contains records. Use the Admin dashboard to manage existing items.');
  }

  const editor = admin?.email || 'admin@pizzaflow.local';
  await Product.insertMany(productSeed.map((product) => ({ ...product, createdBy: editor, updatedBy: editor })));
  await Banner.insertMany(bannerSeed.map((banner) => ({ ...banner, createdBy: editor, updatedBy: editor })));
  console.log(`Created ${productSeed.length} products and ${bannerSeed.length} homepage banners.`);
  await mongoose.disconnect();
}

populate().catch(async (error) => {
  console.error(error.message);
  await mongoose.disconnect();
  process.exit(1);
});
