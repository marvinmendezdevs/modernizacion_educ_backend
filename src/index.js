import express from 'express'
import 'dotenv/config'
import router from "./routing/schools.js";
import './config/db.js';

const app = express();

app.use(cors());

// Comenzando con el routing
app.use('/schools', router)

export default app;