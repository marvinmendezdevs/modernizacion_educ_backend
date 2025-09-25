import { Router } from "express";
import TeacherClass from "../handlers/TeacherClass.js";


const router = Router();

router.get('/', TeacherClass.teachers);

export default router;