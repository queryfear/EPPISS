const { sql } = require('./DataBaseConnection.js');
const { createDB } = require('./createDatabase.js');
const { checkUser} = require('./checkFunctions.js');

async function initializeDatabase() {
    try {
        const result = await createDB();
        console.log("Operation successful.");
    } catch(error) {
        console.error("Error creating table: ", error);
    }
}

/**
 * 
 * Использовать в блоке try catch, так как в случае нахождения логина выкидывает ошибку.
 * 
 * @param {*} login 
 * @param {*} password  
 * @returns 
 */
async function setUser(login, password) {
    await initializeDatabase();

    let role = 'user';

    try {
        await checkUser(login);
    } catch(error) {
        console.error(error);
        return;
    }

    const userparams = await sql`
        INSERT INTO users (login, password, role)
        VALUES (${login}, ${password}, ${role});
    `;
    
    return userparams;
}

module.exports = {
    setUser
};