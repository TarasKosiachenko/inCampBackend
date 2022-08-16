const { Pool } = require("pg");

const pool = new Pool({
  user: "aggregation_app",
  host: "127.0.0.1",
  database: "aggregation",
  password: "tarasko",
});

module.exports = pool;