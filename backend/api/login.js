// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('./models/userModel');  // Make sure this is connected to your database
// const bcrypt = require('bcryptjs');  // Use bcrypt for hashing (if needed)

// const app = express();
// const PORT = 5000;

// app.use(express.json());  // For parsing JSON bodies

// // Mock user data (in production, you would query your database)
// const users = [
//   { email: 'user@example.com', password: 'password123' },
// ];

// // Login Route (email-based)
// app.post('/api/login', async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ message: 'Please provide an email address.' });
//   }

//   // Find user by email (In a real app, check your DB for the user)
//   const user = users.find((user) => user.email === email);

//   if (!user) {
//     return res.status(404).json({ message: 'User not found.' });
//   }

//   // Generate a JWT token
//   const token = jwt.sign({ email: user.email }, 'your_jwt_secret_key', { expiresIn: '1h' });

//   return res.json({ token });
// });

// // Simple server setup
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
