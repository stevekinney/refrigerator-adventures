const path = require('path');

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './server/dev.sqlite3'
    },
    migrations: {
      directory: './server/migrations'
    },
    seeds: {
      directory: './server/seeds/dev'
    },
    useNullAsDefault: true
  }

};
