import mongoose from 'mongoose';
import colors from 'colors';

export const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB connected: ${conn.connection.host}`.bgCyan.bold);
};