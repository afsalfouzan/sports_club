require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
GMAILPASSWORD = process.env.GMAILPASSWORD;

module.exports = async function sendMail(mail) {
  try {
    const { to, subject, text, html } = mail;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.USEREMAIL,
        pass: GMAILPASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.USEREMAIL,
      to: to,
      subject: subject,
      text: text,
      html: html,
    };
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (e) {
    return e;
  }
};
