const postgres = require("postgres");
const sql = postgres(process.env.DB_URL);

module.exports = sql;