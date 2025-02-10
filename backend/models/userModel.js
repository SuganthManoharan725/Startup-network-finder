const { Schema, model } = require('mongoose');
const userSchema = new Schema({
  email: { type: String, required: true },
  credits: { type: Number, default: 5 },
  timestamp: { type: Date, default: Date.now }
});

module.exports = model('users', userSchema);
