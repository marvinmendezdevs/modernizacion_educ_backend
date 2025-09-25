import { Router } from "express";
import SchoolClass from "../handlers/SchoolClass.js";


const router = Router();

router.get('/', SchoolClass.getSchools);
router.get('/:code', SchoolClass.getSchool);

export default router;