const knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'aggregation_app',
    password: 'tarasko',
    database: 'aggregation'
  }
});

module.exports = knex;