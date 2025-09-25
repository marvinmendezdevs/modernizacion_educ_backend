import { Router } from "express";
import StudentClass from "../handlers/StudentClass.js";


const router = Router();

router.get('/', StudentClass.students);

export default router;