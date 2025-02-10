const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,  // Email account
    pass: process.env.GMAIL_PASSWORD  // Email password (Use environment variables for security)
  }
});

// Send recharge confirmation email
const sendRechargeEmail = (recipientEmail) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,  // sender address
    to: recipientEmail,  // receiver address
    subject: 'Recharge Successful',  // email subject
    text: 'Your credits have been successfully recharged by 5 credits.'  // email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Recharge email sent: ' + info.response);
    }
  });
};

module.exports = { sendRechargeEmail };
