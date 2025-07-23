const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "aradhana.webmigrates@gmail.com",
    pass: "ypbhsfrdakgaerry"
  }
});

async function sendMail(to, subject, text, html) {
  const info = await transporter.sendMail({
    from: "aradhana.webmigrates@gmail.com",
    to,
    subject,
    text,
    html
  });

  console.log("Message sent:", info.messageId);
}
module.exports = sendMail;
