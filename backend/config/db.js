// backend/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use your MongoDB URI here (local or remote)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB; // Export for ES module
