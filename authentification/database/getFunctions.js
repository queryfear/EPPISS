const { sql } = require('./DataBaseConnection.js');

async function getUser(login) {
    const validLogin = await sql`
        SELECT login FROM users
        WHERE login = ${login};
        `;
    if (validLogin[0].login == login) {
        return true;
    } else {
        return false;
    }
}

async function getPassword(login) {
    const validPassword = await sql `
        SELECT password FROM users
        WHERE login = ${login};
        `;
    return validPassword[0].password;
}

async function allUsers() {
    const usersArray = await sql `
        SELECT * FROM users;
        `;
    return usersArray;
}

module.exports = {
    getUser, 
    getPassword,
    allUsers
};
