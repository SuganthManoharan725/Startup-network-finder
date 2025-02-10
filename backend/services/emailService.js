const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

const sendRechargeEmail = (email) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: 'Recharge Your Credits',
    text: 'Please send an email with "recharge 5 credits" to get more credits.'
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendRechargeEmail };
