import express from 'express';
import { register, userLogin, verifyEmail } from '../controller/userController.js';
import { userLoginSchema, userRegistrationSchema, validateData } from '../middleware/validateData.js';
import { upload, uploadImage } from '../middleware/uploadFile.js';
import { verifyToken } from '../middleware/verifyToken.js';

const route = express.Router();

route.post('/create', validateData(userRegistrationSchema) ,register);
route.get('/verify', verifyEmail);
route.post('/login', validateData(userLoginSchema) ,userLogin);
route.post('/uploads', verifyToken ,upload.single('profilePic'), uploadImage);

export default route;