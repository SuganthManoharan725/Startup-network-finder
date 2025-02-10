const User = require('../models/userModel');
const { sendRechargeEmail } = require('../services/emailService');
const { google } = require('googleapis');

// Handle email recharge request
const handleRechargeEmail = async (req, res) => {
  const { email, subject } = req.body;

  // Make sure the email and subject are provided
  if (!email || !subject) {
    return res.status(400).json({ message: 'Email and subject are required' });
  }

  // Check if the subject matches "recharge 5 credits"
  if (subject.toLowerCase() !== 'recharge 5 credits') {
    return res.status(400).json({ message: 'Invalid subject. Please use "recharge 5 credits" to recharge.' });
  }

  try {
    // Check if user exists in the database
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // Check if the user already has credits (prevent multiple recharge)
    if (user.credits >= 5) {
      return res.status(400).json({ message: 'Sorry, we are not offering additional credits at this time.' });
    }

    // Add 5 credits to the user's account
    user.credits += 5;
    await user.save();

    // Send an email confirming the recharge
    sendRechargeEmail(email);

    // Return a success response
    return res.json({ message: 'Credits recharged successfully' });

  } catch (error) {
    console.error('Error processing recharge email:', error);
    return res.status(500).json({ message: 'An error occurred while processing the recharge request.' });
  }
};

// Function to fetch emails (if you want this to be automated)
const checkRechargeEmails = async () => {
  try {
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/gmail.readonly'],
    });

    const authClient = await auth.getClient();
    const gmail = google.gmail({ version: 'v1', auth: authClient });

    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'subject:"recharge 5 credits"',
    });

    const messages = res.data.messages || [];

    if (messages.length) {
      for (const message of messages) {
        const msg = await gmail.users.messages.get({ userId: 'me', id: message.id });

        // Get the email address of the sender
        const email = msg.data.payload.headers.find(header => header.name === 'From').value;

        // Process the recharge
        await handleRechargeEmail({ body: { email, subject: 'recharge 5 credits' } }, {
          json: (response) => {
            console.log(response); // Simulate the response of the recharge action
          },
          status: (code) => {
            console.log(code); // Simulate the status code
          },
        });
      }
    } else {
      console.log('No recharge emails found.');
    }
  } catch (error) {
    console.error('Error fetching emails:', error);
  }
};
module.exports = { handleRechargeEmail, checkRechargeEmails };
