export default {

    development: {
      client: 'postgresql',
      connection: {
        database: 'proyecto',
        user: 'postgres',
        password: 'postgres',
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: './migrations',  // use forward slashes here
      },
      seeds: {
        directory: './data/seeds'
      }
    },
  
    production: {
      client: 'postgresql',
      connection: {
        database: 'proyecto',
        user: 'proyecto',
        password: 'proyecto',
      },
      pool: {
        min: 2,
        max: 10
      },
      migrations: {
        directory: './migrations',  // use forward slashes here
      }
    }
  
  };
  