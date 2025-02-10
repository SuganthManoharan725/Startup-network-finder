require('dotenv').config();  
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const searchRoutes = require('./routes/searchRoutes');
const emailRoutes = require('./routes/emailRoutes');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');  // Make sure this is connected to your database
const bcrypt = require('bcryptjs'); 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/email', emailRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  
  // Login Route (email-based)
app.post('/api/login', async (req, res) => {
  const { email } = req.body;  

  if (!email) {
    return res.status(400).json({ message: 'Please provide an email address.' });
  }

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email: email});
   // Using findOne with await
    console.log("Found user:", user); 

    if (!user) {  // Check if user doesn't exist
      return res.status(404).json({ message: 'User not found.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ email: user.email }, 'testing', { expiresIn: '1h' });

    // Return the token in the response
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
