const User = require('../models/userModel');

// Add credits to a user
const addCredits = async (email, creditsToAdd = 5) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    // Add credits
    user.credits += creditsToAdd;

    // Save the updated user
    await user.save();

    return user.credits;  // Return the updated credit value
  } catch (error) {
    throw new Error(`Error adding credits: ${error.message}`);
  }
};

// Check if user has enough credits for a search
const checkCredits = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return user.credits;  // Return the current credit balance
  } catch (error) {
    throw new Error(`Error checking credits: ${error.message}`);
  }
};

module.exports = { addCredits, checkCredits };
