import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: secure_configuration.process.env.EMAIL_USERNAME,
    pass: secure_configuration.process.env.PASSWORD
  }
})

const token = jwt.sign({
  data: 'Token Data' }, 'ourSecretKey', {expiresIn: '10m'}
)

const mailConfigurations = {
  from: 'aayush@itobuz.com',
  to: 'aayush@itobuz.com',

  subject: 'Email Verification',

  text: `Hi! There, You have recently visited
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:3000/verify/${token} 
           Thanks`
}

transporter.sendMail(mailConfigurations, function(error,info){
  if(error) throw Error(error);
  console.log('Email Sent Succesfully');
  console.log(info);
})