const { Pool } = require("pg");

const pool = new Pool({
  user: "mytodos_app",
  host: "127.0.0.1",
  database: "mytodos",
  password: "kosiat",
});

module.exports = pool;