import express from 'express';
import { createNote, deleteNote, getNote, getNoteById, pagination, search, sort, updateNote} from '../controller/notezcontroller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const route = express.Router();

route.post('/add', verifyToken ,createNote);
route.get('/getAll', verifyToken, getNote);
route.delete('/delete', verifyToken, deleteNote);
route.put('/update', verifyToken, updateNote);

route.get('/getById', verifyToken, getNoteById);
route.get('/search', verifyToken, search);
route.get('/sort', verifyToken, sort);
route.get('/pagination', verifyToken, pagination);
export default route;