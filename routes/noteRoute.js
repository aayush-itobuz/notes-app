import express from 'express';
import { create } from '../controller/notezcontroller.js';

const route = express.Router();

route.post('/add', create);

export default route;