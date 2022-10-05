import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
    let nodemailer = require('nodemailer')

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: 'homebirdmakes.website@gmail.com',
          pass: process.env.GMAIL_SMTP_PASSWORD,
        },
        secure: true,
      })

      const mailData = {
        from: 'homebirdmakes.websote@gmail.com',
        to: 'alibelcher@aol.com',
        subject: `Message From ${req.body.name}`,
        text: req.body.message + " | Sent from: " + req.body.email,
        html: `<div>${req.body.message}</div><p>Sent from:
        ${req.body.email}</p>`
      }  
      transporter.sendMail(mailData, function (err, info) {
        if(err)
          console.log(err)
      })

      res.status(200)
}