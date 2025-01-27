import { sendEmail } from "../emailVerify/verification.js";
import userSchema from "../models/userSchema.js";
import jwt from 'jsonwebtoken';

// create
export const addUser = async (req, res) => {
  try{
    const {email, password} = req.body;
    const isVerified = false;
    const token = sendEmail("aayush@itobuz.com");
    const data = await userSchema.create({
      email,
      password,
      token,
      isVerified
    })
    if(data){
      res.json({
        status: 200,
        data:data,
        message: "Email sent successfully"
      })
    }
  } catch(error) {
    console.log(error);
    res.json({
      status: 404,
      message: "error occurred during email sending"
    })
  }
}

// verification
export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if(err) {
      console.log(err);
      res.send("Email verification failed, possibly the link is invalid or expired");
    }
    else {
      userSchema.findOneAndUpdate({ token: token},
        { $set: { isVerified: 'true', token: ""} },
        { new: true}
      )
      .then(res.status(200).send("Email verified successfully"))
      .catch(err => res.status(400).send("Error occurred during verify"))
    }
  })
}