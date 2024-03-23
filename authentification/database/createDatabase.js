const { sql } = require('./DataBaseConnection.js');

async function createDB() {
    const table = await sql`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            login VARCHAR(20) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL,
            role TEXT
        )`;
    return table;
}

module.exports = {
    createDB
};