const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const scr = require('@bochilteam/scraper')
const router = express.Router();

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
router.get('/api/ytmp4', async (req, res, next) => {
    const url = req.query.url
    if (!url) return res.json({
        status: false,
        creator: `RelixOfficial`,
        message: "masukan parameter url"
    })
    
    const {
        id,
        thumbnail,
        video: _video,
        title
    } = await scr.youtubedlv2(url)
    try {
        for (let i in _video) {
            video = _video[i]
            let kin = await video.download()
            res.json({
                id: id,
                thumbnail: thumbnail,
                title: title,
                size: video.fileSize,
                download: kin
            })
        }
    } catch {
        console.log(e);
        res.json(loghandler.error)
    }
    
})
app.use((req, res, next) => {
  res
    .status(404)
    .json({
      status: false,
      msg: "Visit https://github.com/Armanidrisi/Mailer For More Info",
    });
});
app.listen(5000, () => console.log("API listening on port 5000"));
