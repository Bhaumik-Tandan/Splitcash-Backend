import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js'; // Assuming you have a user model

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if a user with the provided email exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token payload (could include user id and other info)
    const tokenPayload = { userId: user._id, email: user.email };

    // Sign the JWT token and populate the payload with the user id
    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET
    );

    // Send the token to the client
    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user document
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Create token payload (could include user id and other info)
    const tokenPayload = { userId: newUser._id, email: newUser.email };

    // Sign the JWT token and populate the payload with the user id
    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET
    );

    // Send the token to the client
    res.status(201).json({
      message: 'Signup successful',
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
