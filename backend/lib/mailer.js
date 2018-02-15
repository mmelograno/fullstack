'use strict';

const nodemailer = require('nodemailer');

const config = require('../config');

const passwordResetTemplate = (user) => {
  const href = `${config.host}:${config.host}/reset/${user.passwordResetToken}`;
  return `<div style="font-family: Sans-serif"><h1 style="text-align: center">nodeapp</h1>
  <h2>Hi, ${user.firstName} ${user.lastName}!</h2><h3>There was a request to change your password.</h3>
  <p>If you did not make the request, just ignore this email. Otherwise, please click the button below to change your password:</p>
  <div style="text-align: center"><a href="${href}" style="background-color: #008CBA; color: white; padding: 15px 32px; text-align: center;
  text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 3px; font-weight: bold">Reset Password</a>
  </div><p style="margin-bottom: 0px">Regards,</p><p style="margin-top: 0px">nodeapp</p></div>`;
};

const transporter = nodemailer.createTransport({
  host: config.mail.host,
  port: config.mail.port,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.mail.account.user,
    pass: config.mail.account.pass,
  },
});

const sendEmail = mailOptions =>
  new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(`Message sent: ${info.messageId}`);
    });
  });

const sendEmailToUser = async (user, key) => {
  let html = '';
  let subject = '';
  switch (key) {
    case 'password-reset-email':
      html = passwordResetTemplate(user);
      subject = 'Reset Password';
      break;

    default:
      break;
  }
  const mailOptions = {
    from: config.mail.from,
    to: user.email,
    subject,
    html,
  };

  try {
    const info = await sendEmail(mailOptions);
    Promise.resolve(info);
  } catch (err) {
    Promise.reject(err);
  }
};

module.exports = {
  sendEmailToUser,
};
