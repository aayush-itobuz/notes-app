import express from 'express';
<<<<<<< Updated upstream:routes/noteRoute.js
import { create } from '../controller/notezcontroller.js';
=======
import { createNote, deleteNote, getNote, getNoteById, pagination, search, sort, updateNote} from '../../controller/notezcontroller.js';
import { verifyToken } from '../../middleware/verifyToken.js';
>>>>>>> Stashed changes:backend/src/routes/noteRoute.js

const route = express.Router();

route.post('/add', create);

export default route;