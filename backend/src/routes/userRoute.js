import express from 'express';
import { register, userLogin, verifyEmail } from '../controller/userController.js';
import { userLoginSchema, userRegistrationSchema, validateData } from '../middleware/validateData.js';

const route = express.Router();

route.post('/create', validateData(userRegistrationSchema) ,register);
route.get('/verify', verifyEmail);
route.post('/login', validateData(userLoginSchema) ,userLogin);

export default route;