const { sql } = require('./DataBaseConnection.js');

async function updateRole(login, New_Role) {
    const role = await sql`
        UPDATE users
        SET role = ${New_Role}
        WHERE login = ${login};
    `;
    return role;
}

async function updateLogin(Old_Login, New_Login) {
    const login = await sql`
        UPDATE users
        SET login = ${New_Login}
        WHERE login = ${Old_Login};
    `;
    return login;
}

async function changePassword(login, New_Password) {
    const password = await sql`
        UPDATE users
        SET password = ${New_Password}
        WHERE login = ${login};
    `;
    return password;
}

module.exports = {
    updateRole,
    updateLogin,
    changePassword
};