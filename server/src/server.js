import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import { startStockMonitor } from './jobs/stockMonitor.js';
import { seedDatabase } from './services/store.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  try {
    await connectDB();
  } catch (error) {
    console.warn('MongoDB connection failed, continuing with the in-memory store:', error.message);
  }
  await seedDatabase();
  startStockMonitor();
  app.listen(PORT, () => {
    console.log(`PizzaFlow API running on port ${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error('Server bootstrap failed', error);
  process.exit(1);
});
