import express from 'express';
import { addUser, userLogin, verifyEmail } from '../controller/userController.js';

const route = express.Router();

route.post('/create', addUser);
route.get('/verify/:token', verifyEmail);
route.post('/login', userLogin);

export default route;