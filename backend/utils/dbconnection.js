const mongoose = require('mongoose');

// Establish connection to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to database:', error.message);
    process.exit(1);  // Exit the process with a failure code
  }
};

module.exports = connectDB;
