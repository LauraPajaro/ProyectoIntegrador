// Update with your config settings.
import env from '../../config/env.js'
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 export default {
    client: 'postgresql',
    connection: {
      database: env.sql.database,
      user: env.sql.user, 
      password:  env.sql.password, 
    },
    pool: { min: env.sql.poolMin, max: env.sql.poolMax },
    migrations: { tableName: 'knex_migrations'  },
    seeds: {  directory: './data/seeds' }
};
