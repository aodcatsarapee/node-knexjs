const env = require("./env");
const db = require("knex")({
  client: env.dialect,
  connection: {
    host: env.host,
    user: env.username,
    password: env.password,
    database: env.database
  }
});

module.exports = db;
