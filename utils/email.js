const nodemailer = require('nodemailer');
const Email = require('../models/emailModel');

const sendEmail = async (options) => {
  const emailsettings = await Email.findById({
    _id: '5f2e3d86d15a133adc74df50',
  });
  let host = emailsettings.host;
  let user = emailsettings.username;
  let pass = emailsettings.password;
  //1 transporter
  const transporter = nodemailer.createTransport({
    service: host,
    auth: {
      user: user,
      pass: pass,
    },
  });

  //2 define email options
  const mailOptions = {
    from: `CUBOID <${emailsettings.username}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };
  //3 Actually send the email

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
