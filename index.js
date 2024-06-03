const express = require("express");
const fetch = require('node-fetch');
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const request = require("request")
const app = express();
const scr = require('@bochilteam/scraper')
const router = express.Router();

app.use(cors())
app.use(bodyParser.json());


app.get('/api/ai', async (req, res) => {
    var input = req.query.text
    const model = '@cf/openchat/openchat-3.5-0106';
    const API = 'DR6F2O3GnI3KRyn58LpRFpgnPrnMVgkG2eizO8R7';
    
async function run(input) {
    const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/2776c1a12d86d8b316a5232ccb9fda85/ai/run/${model}`,
    {
      headers: { Authorization: `Bearer ${API}` },
      method: "POST",
      body: JSON.stringify(input),
    }
  );
  const result = await response.json();
  return result;
}
run("@cf/meta/llama-2-7b-chat-int8", {
  messages: [
    {
      role: "system",
      content: "You are a friendly assistan that helps write stories",
    },
    {
      role: "user",
      content:
        "Write a short story about a llama that goes on a journey to find an orange cloud ",
    },
  ],
}).then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(response)
        })
});
)}

app.post("/api/mail", (req, res) => {
  const sender = req.body.sender;
  const pass = req.body.password;
  const to = req.body.recipient;
  const subject = req.body.subject;
  const mailbody = req.body.message;
  const sendEmail = async (mailDetails) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 25,
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
app.get('/api/ytmp4', async (req, res) => {
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
app.get('/cecan/indonesia', async (req, res) => {
    
    var data = ["https://i.postimg.cc/sgYy39Yy/1.jpg", "https://i.postimg.cc/k5wmbJYp/10.jpg", "https://i.postimg.cc/XJJ0KRT7/11.jpg", "https://i.postimg.cc/PfCCT9Pj/12.jpg", "https://i.postimg.cc/GpbRt8KD/13.jpg", "https://i.postimg.cc/gkRr6hVt/14.jpg", "https://i.postimg.cc/rsRX3SVB/15.jpg", "https://i.postimg.cc/52S0sMkw/16.jpg", "https://i.postimg.cc/tTY4RnR5/17.jpg", "https://i.postimg.cc/4d7XRCw2/18.jpg", "https://i.postimg.cc/k55nwRSm/19.jpg", "https://i.postimg.cc/QCcsVp2p/2.jpg", "https://i.postimg.cc/zGz5XH0g/20.jpg", "https://i.postimg.cc/y8LKJ6br/21.jpg", "https://i.postimg.cc/WbjcXJRH/22.jpg", "https://i.postimg.cc/m2wfq2B2/23.jpg", "https://i.postimg.cc/MGghRnbt/24.jpg", "https://i.postimg.cc/1t6bKyvS/25.jpg", "https://i.postimg.cc/fyNp21P9/26.jpg", "https://i.postimg.cc/J05g9Pwd/27.jpg", "https://i.postimg.cc/m2TKQfCx/28.jpg", "https://i.postimg.cc/MKtN5Pmn/29.jpg", "https://i.postimg.cc/PxGRJBTR/3.jpg", "https://i.postimg.cc/cHQ5nXJ4/30.jpg", "https://i.postimg.cc/bY9BYCMm/31.jpg", "https://i.postimg.cc/QdH4bXMz/32.jpg", "https://i.postimg.cc/Rhgd78x9/33.jpg", "https://i.postimg.cc/sD2wjV52/34.jpg", "https://i.postimg.cc/pXV1mQMR/35.jpg", "https://i.postimg.cc/sfmTCBQ8/36.jpg", "https://i.postimg.cc/ZRcxmgR3/37.jpg", "https://i.postimg.cc/mkgNgwzn/38.jpg", "https://i.postimg.cc/pXyJNsth/4.jpg", "https://i.postimg.cc/13q0X4Xy/5.jpg", "https://i.postimg.cc/DZBLHXjP/7.jpg", "https://i.postimg.cc/RhYfVzz3/8.jpg", "https://i.postimg.cc/TYZmzG9F/9.jpg"]
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    
})
app.get('/api/kbbi', async (req, res) => {
    
    var text = req.query.kata
    
    if (!text) return res.json({
        status: false,
        creator: `RelixOfficial`,
        message: "masukan parameter kata"
    })
    fetch(encodeURI(`https://kbbi-api-zhirrr.vercel.app/api/kbbi?text=${text}`))
        .then(response => response.json())
        .then(data => {
            var result = data;
            res.json({
                result
            })
        })
        .catch(e => {
            console.log(e);
            res.json(loghandler.error)
        })
    
})

app.get('/api/tinyurl2', async (req, res) => {
    
    var url2 = req.query.url

     if (!url2) return res.json({
        status: false,
        creator: `RelixOfficial`,
        message: "masukan parameter url"
    })

     request(`https://tinyurl.com/api-create.php?url=${url2}`, function (error, response, body) {
         try {
             res.json({
                 status : true,
                 creator : `RelixOfficial`,
                 result : {
                     link : `${body}`,
                 },
                 message : `jangan lupa follow`
             })
         } catch (e) {
             console.log('Error :', color(e,'red'))
             res.json(loghandler.invalidlink)
         }
     })
})
app.get('/api/yt-short', async (req, res) => {
  const url = req.query.url
  if (!url) return res.json({
    status: false,
    author: "RelixOfficial",
    message: "Masukan Url"
  })

  xcode = await fetchJson(`https://api-xcoders.site/api/download/yt-short?url=${url}&apikey=Frieren`)
  let result = xcode.result
  if (!result) res.json({
    status: false,
    author: "RelixOfficial",
    message: "ErrorTidak Ada Vidio"
  })
  res.json({
    status: "Success",
    code: 200,
    author: "RelixOfficial",
    data: result
  })
 
})
app.use((req, res, next) => {
  res
    .status(404)
    .json({
      status: false,
      msg: "Visits https://github.com/Armanidrisi/Mailer For More Info By Relix",
    });
});
app.listen(5000, () => console.log("API listening on port 5000"));
