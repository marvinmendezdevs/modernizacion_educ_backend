import express from 'express'
import 'dotenv/config'
import routerSchools from "./routing/schools.js";
import routerTeachers from "./routing/teachers.js";
import routerStudents from "./routing/students.js";
import cors from 'cors'
import './config/db.js';

const app = express();

app.use(cors());

// Comenzando con el routing
app.use('/schools', routerSchools)
app.use('/teachers', routerTeachers)
app.use('/students', routerStudents)

export default app;