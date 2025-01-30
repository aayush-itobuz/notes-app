import express from 'express';
import { addUser, userLogin, verifyEmail } from '../controller/userController.js';
import { userLoginSchema, userRegistrationSchema, validateData } from '../middleware/validateData.js';

const route = express.Router();

route.post('/create', validateData(userRegistrationSchema) ,addUser);
route.get('/verify/:token', verifyEmail);
route.post('/login', validateData(userLoginSchema) ,userLogin);

export default route;