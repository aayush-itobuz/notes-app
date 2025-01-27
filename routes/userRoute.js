import express from 'express';
import { addUser, verifyEmail } from '../controller/userController.js';

const route = express.Router();

route.post('/create',addUser);
route.get('/verify/:token', verifyEmail);

export default route;