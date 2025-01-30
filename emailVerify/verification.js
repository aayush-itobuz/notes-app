import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const sendEmail = (email,id) => {
  console.log("send",id);
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.PASSWORD
    }
  })

  // token generate
  const token = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30m' })

  const mailConfigurations = {
    from: 'aayush@itobuz.com',
    to: 'aayush@itobuz.com',

    subject: 'Email Verification',

    text: `Hi! There, You have recently visited our website and entered your email.
    Please follow the given link to verify your email http://localhost:3000/note/verify/${token}`
  }

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log('Email Sent Successfully');
    console.log(`token : ${token}`);
  })

  return token;
}
