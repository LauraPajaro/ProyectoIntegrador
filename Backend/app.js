import dotenv from 'dotenv';
import express from 'express';
import controllers from './controllers/index.js'
import env from './config/env.js';
import { before, after } from './middleware/index.js';
let app = express();
app.use(express.json()); 
app = before(app);
app.use(controllers);
app = after(app);

app.listen(env.app.port, () => {
    console.log(`Server listening on port ${env.app.port}`);
})
