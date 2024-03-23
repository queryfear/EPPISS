//db js
require('dotenv').config({path: "./database/.env"});
const postgres = require("postgres");

const connectionString = process.env.DATABASE_URL;
console.log(process.env.DATABASE_URL)
const sql = postgres(connectionString);

module.exports = {
    sql
};