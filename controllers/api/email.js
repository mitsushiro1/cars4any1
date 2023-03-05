

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,

  auth: {
    user: 'cars4every1yay@gmail.com',
    pass: 'fydcewwsvduymtib'
  },
  secureConnection: 'false',
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false

    }
});

function sendWelcomeEmail(email) {
  const mailOptions = {
    from: 'cars4any1@gmail.com',
    to: email,
    subject: 'Welcome to cars4any1',
    text: 'Thank you for signing up!'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = {
  sendWelcomeEmail
};
