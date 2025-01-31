import express from 'express';
import { createNote, deleteNote, getNote, updateNote } from '../controller/notezcontroller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const route = express.Router();

route.post('/add', verifyToken ,createNote);
route.get('/getAll', verifyToken, getNote);
route.delete('/delete', verifyToken, deleteNote);
route.put('/update', verifyToken, updateNote);

export default route;