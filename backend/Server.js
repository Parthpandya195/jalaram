import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import connectDB from './config/db.js'; // MongoDB connection
import User from './models/User.js';
import bcrypt from 'bcryptjs'; // bcryptjs for password hashing
import authRoutes from './routes/Auth.js';

// Use require for CommonJS modules
import productRoutes from './routes/productRoutes.js';

dotenv.config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration (to allow your React frontend to connect)
app.use(cors({
  origin: 'http://localhost:3000', // Allow React app on localhost:3000 to connect
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/testing';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Route for user login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  // Debugging logs
  console.log('Request body:', req.body);

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials 11' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials 22' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
});

// Signup route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user and save it
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ success: false, message: 'An error occurred while signing up' });
  }
});

// Root route to verify the server is up
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Routes
app.use('/api/Auth', authRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

// Error handling middleware (for unexpected errors)
app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ success: false, message: 'An unexpected error occurred' });
});

// Default route for invalid endpoints
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
