const { sql } = require('./DataBaseConnection.js');

async function checkUser(login) {
    const loginExist = await sql`
        SELECT login FROM users
        WHERE login = ${login};
    `;
    if (loginExist.length > 0) {
        throw new Error("Login already exists.")
    } else {
        return true;
    }
}

async function checkRole(login) {
    const role = await sql`
        SELECT role FROM users
        WHERE login = ${login};
    `;
    return role[0];
}

async function checkID(login) {
    const id = await sql`
        SELECT id FROM users
        WHERE login = ${login};
    `;
    return id[0];
}

module.exports = {
    checkUser,
    checkRole,
    checkID
};

