import { sendEmail } from "../emailVerify/verification.js";
import userSchema from "../models/userSchema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// create
export const addUser = async (req, res) => {
  try{
    const {userName, email, password} = req.body;

    const user = await userSchema.findOne({ email });
    if(user) return res.status(400).json("user already exists");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const isVerified = false;
    const data = await userSchema.create({
      userName,
      email,
      password : hashedPassword,
      isVerified
    })

    sendEmail("aayush@itobuz.com");

    if(data){
      res.json({
        status: 200,
        _id:data._id,
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
  const user = await userSchema.findOne();
  jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
    if(err) {
      console.log(err);
      res.json("Email verification failed, possibly the link is invalid or expired");
    }
    else {
      user.isVerified="true";
      user.save();
      res.status(200).json("Email verified successfully");
    }
  })
}

// login
export const userLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userSchema.findOne({ email:`${email}`}, {email:1, password: 1, isVerified:1 }).exec();

    if(!user) {
      return res.status(404).json("Authentication failed");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(user.isVerified && passwordMatch) {
      user.isLogged="true";
      await user.save();
      res.send('Login successful');
    }
    else if(!user.isVerified){
      res.status(403).json('user not verified yet')
    }
    else {
      res.status(401).json('Invalid credentials');
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json('An error occurred');
  }
}