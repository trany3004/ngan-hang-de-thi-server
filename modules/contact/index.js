 
const express = require('express')
const router = new express.Router()
const nodemailer = require("nodemailer");

router.post("/sendMail", async (req, res) => {
    const { email, noiDung } = req.body;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ydi300400@gmail.com',
        pass: 'Nhuy3004'
      }
    });

  const mailOptions = {
    from: `${email}`,
    to: `ydi300400@gmail.com`,
    subject: 'Mail liên hệ từ Ngân hàng đề thi',
    text: noiDung
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.send(500).json(error);
    } else {
      res.status(200).json('OK');
    }
  })
  
});

module.exports = router

