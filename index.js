const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.post("/api/mail", (req, res) => {
  const sender = req.body.sender;
  const pass = req.body.password;
  const to = req.body.recipient;
  const subject = req.body.subject;
  const mailbody = req.body.message;
  const sendEmail = async (mailDetails) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: sender,
        pass: pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    try {
      //console.log("Sending your email...");
      await transporter.sendMail(mailDetails);
      res.json({ status: true, msg: "Email Send Success" });
    } catch (error) {
      res.status(404).json({ status: false, msg: "Failed To Send mail" });
    }
  };

  sendEmail({
    from: sender,
    to: to,
    subject: subject,
    text: mailbody,
  });
});
app.use((req, res, next) => {
  res
    .status(404)
    .json({
      status: false,
      msg: "Visit https://github.com/Armanidrisi/Mailer For More Info",
    });
});
app.listen(5000, () => console.log("API listening on port 5000"));
