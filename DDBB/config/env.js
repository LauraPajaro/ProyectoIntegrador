// Levanta las variables de entorno del archivo .env
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') })

//------------------------------- Enviroment Variables ----------------------------------
export default {
  app: {
    env: process.env.APP_NODE_ENV || 'development',
    pwd: process.env.APP_PWD || "",
    ssl_port: parseInt(process.env.APP_SSL_PORT) || 443,
    port: parseInt(process.env.APP_PORT) || 8080,
    frontEndUrl: process.env.FRONT_END_URL,
    logLevel: parseInt(process.env.APP_LOG_LEVEL) || 0,
    timezone: process.env.APP_TIMEZONE || 'America/Argentina/Buenos_Aires',
  },
  jwt: {
    secret: process.env.JWT_SECRET || "YOUR_secret_key",
    dfltExpiration: parseInt(process.env.JWT_DURATION) || 1800000,
    saltWorkFactor: parseInt(process.env.SALT_WORK_FACTOR) || 10,
  },
  middleware: {
    log: {
      req: {
        req: process.env.MIDDLEWARE_LOG_REQ_REQ || true,
        ip: process.env.MIDDLEWARE_LOG_REQ_IP || true,
        url: process.env.MIDDLEWARE_LOG_REQ_URL || true,
        method: process.env.MIDDLEWARE_LOG_REQ_METHOD || true,
        query: process.env.MIDDLEWARE_LOG_REQ_QUERY || true,
        headers: process.env.MIDDLEWARE_LOG_REQ_HEADERS || false,
        body: process.env.MIDDLEWARE_LOG_REQ_BODY || 'oneline',
        auth: process.env.MIDDLEWARE_LOG_REQ_AUTH || 'oneline',
      },
      res: {
        res: process.env.MIDDLEWARE_LOG_RES_RES || true,
        headers: process.env.MIDDLEWARE_LOG_RES_HEADERS || false,
        body: process.env.MIDDLEWARE_LOG_RES_BODY || 'oneline',
        auth: process.env.MIDDLEWARE_LOG_RES_AUTH || false,
      }
    },
  },
  sql: {
    client: 'postgresql',
    connection: {
      database: process.env.SQL_DDBB,
      user: process.env.SQL_USER || 'postgres',
      password: process.env.SQL_PASSWORD || 'postgres',
    },
    pool: { min: parseInt(process.env.SQL_POOL_MIN) || 2, max: parseInt(process.env.SQL_POOL_MAX) || 10 },
    migrations: { tableName: 'knex_migrations' },
    seeds: { directory: './data/seeds' }
},
  pg: {
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
  }
}