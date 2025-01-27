import { sendEmail } from "../emailVerify/verification.js";
import userSchema from "../models/userSchema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// create
export const addUser = async (req, res) => {
  try{
    const {userName, email, password} = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const isVerified = false;
    const data = await userSchema.create({
      userName,
      email,
      password : hashedPassword,
      isVerified
    })
    const token = sendEmail("aayush@itobuz.com");
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

// login
export const userLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userSchema.findOne({ email:`${email}`}, {email:1, password: 1, isVerified:1 }).exec();

    if(!user) {
      return res.status(404).send("Authentication failed");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(user.isVerified && passwordMatch) {
      user.isLogged="true";
      await user.save();
      res.send('Login successful');
    }
    else if(!user.isVerified){
      res.status(403).send('user not verified yet')
    }
    else {
      res.status(401).send('Invalid credentials');
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}