import express from "express";

import { addTeacherToList, removeTeacherFromList, getAllTeacherList, mostFavTeacher, searchTeacher } from '../controller/favourites.js';
import auth from '../middleware/auth.js'
import ensureStudent from '../middleware/ensureStudent.js'

const router = express.Router();

router.post('/add', auth, ensureStudent , addTeacherToList);
router.post('/remove', auth, ensureStudent, removeTeacherFromList);
router.get('/teachers', auth, ensureStudent, getAllTeacherList);
router.get('/most', auth, mostFavTeacher);
router.get('/', auth, ensureStudent, searchTeacher);

export default router