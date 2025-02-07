import multer from 'multer';
import path from 'path';
import userSchema from '../models/userSchema.js';

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json('please upload file');
    }

    const userId = req.userId;
    console.log(userId);

    const user = await userSchema.findById(userId);
    console.log(user);
    user.profilePic = "http://localhost:3000/uploads/" + req.file.filename;
    console.log(user.profilePic);
    await user.save();
    return res.status(200).json({
      message: 'file uploaded successfully',
      user
    })
  }
  catch (error) {
    console.error(error);
    res.status(500).json('An error occurred');
  }
}