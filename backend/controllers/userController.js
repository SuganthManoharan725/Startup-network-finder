const user = require('../models/userModel');
const sendRechargeEmail  = require('../services/emailService');

const getUserCredits = async (req, res) => {
  try {
    const user = await user.findOne({ email: req.params.email });
    if (user) {
      return res.json({ credits: user.credits });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rechargeCredits = async (req, res) => {
  try {
    const user = await user.findOne({ email: req.params.email });
    if (user) {
      if (user.credits >= 5) {
        return res.status(400).json({ message: 'Sorry, we are not offering additional credits at this time.' });
      } else {
        user.credits += 5;
        await user.save();
        return res.json({ message: 'Credits recharged successfully' });
      }
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserCredits, rechargeCredits };
