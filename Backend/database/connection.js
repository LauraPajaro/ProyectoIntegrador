import pkg from 'pg';
import dotenv from 'dotenv';
import env from '../config/env.js';


dotenv.config(); // Load .env variables
const { Pool } = pkg;
const pool = new Pool({
    user: env.pg.user,
    host: env.pg.host,
    database: env.pg.database,
    password: env.pg.password,
    port: env.pg.port,
    allowExitOnIdle: true,
});

(async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected:', res.rows[0]);
    } catch (error) {
        console.log('Error:', error);
    }
})();