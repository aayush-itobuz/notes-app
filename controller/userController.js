import { sendEmail } from "../emailVerify/verification.js";
import userSchema from "../models/userSchema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// user registration 
export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const user = await userSchema.findOne({ email });


    if (user) return res.status(403).json("user already exists");

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const isVerified = false;
    const data = new userSchema({
      userName,
      email,
      password: hashedPassword,
      isVerified
    })

    await data.save();

    const id = data._id;
    console.log("register", id);

    sendEmail("aayush@itobuz.com", id);

    if (data) {
      res.json({
        status: 200,
        _id: data._id,
        message: "Email sent successfully",
      })
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: 404,
      message: "error occurred during email sending"
    })
  }
}

// verification
export const verifyEmail = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    console.log("token", token);

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.log(err);
        res.json("Email verification failed, possibly the link is invalid or expired");
      }
      else {
        const id = decoded.id;
        const user = await userSchema.findById(id);
        user.isVerified = "true";
        user.save();
        res.status(200).json("Email verified successfully");
      }
    })
  }
}

// login
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: `${email}` }, { email: 1, password: 1, isVerified: 1 }).exec();

    if (!user) {
      return res.status(404).json("Authentication failed");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (user.isVerified && passwordMatch) {
      const id = user._id;
      const accessToken = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '30d' });
      user.isLogged = "true";
      await user.save();
      res.json({
        message: 'Login successful',
        accessToken: accessToken,
        refreshToken: refreshToken
      })
    }
    else if (!user.isVerified) {
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