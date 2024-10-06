import dotenv from 'dotenv';
import express from 'express';
import controllers from './controllers/index.js'
import env from './config/env.js';

let app = express();

app.use(controllers)

app.listen(env.app.port, () => {
    console.log(`Server listening on port ${env.app.port}`);
})
