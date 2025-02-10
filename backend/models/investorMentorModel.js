const { Schema, model } = require('mongoose');

const investorMentorSchema = new Schema({
  name: String,
  category: String,
  type: String
});

module.exports =  model('InvestorMentor', investorMentorSchema);
