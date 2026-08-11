import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.log('MONGO_URI not provided, running with the in-memory store.');
    return null;
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
  return mongoose.connection;
}
