const sql = require("./DatabaseConnection");

class UserModel {
    async createDB() {
        const table = await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                login VARCHAR(20) UNIQUE NOT NULL,
                password VARCHAR(50) NOT NULL,
                role TEXT
            )`;
        return table;
    }

    async initializeDatabase() {
        try {
            const result = await this.createDB();
            console.log("Operation successful.");
        } catch(error) {
            console.error("Error creating table: ", error);
        }
    }
    
    async checkUser(login) {
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
    
    async checkRole(login) {
        const role = await sql`
            SELECT role FROM users
            WHERE login = ${login};
        `;
        return role[0];
    }
    
    async checkID(login) {
        const id = await sql`
            SELECT id FROM users
            WHERE login = ${login};
        `;
        return id[0];
    }
    
    async getUser(login) {
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
    
    async getPassword(login) {
        const validPassword = await sql `
            SELECT password FROM users
            WHERE login = ${login};
            `;
        return validPassword[0].password;
    }
    
    async allUsers() {
        const usersArray = await sql `
            SELECT * FROM users;
            `;
        return usersArray;
    }
    
    async updateRole(login, New_Role) {
        const role = await sql`
            UPDATE users
            SET role = ${New_Role}
            WHERE login = ${login};
        `;
        return role;
    }
    
    async updateLogin(Old_Login, New_Login) {
        const login = await sql`
            UPDATE users
            SET login = ${New_Login}
            WHERE login = ${Old_Login};
        `;
        return login;
    }
    
    async changePassword(login, New_Password) {
        const password = await sql`
            UPDATE users
            SET password = ${New_Password}
            WHERE login = ${login};
        `;
        return password;
    }
    
    async setUser(login, password) {
        await this.initializeDatabase();
    
        let role = 'user';
    
        try {
            await this.checkUser(login);
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
}

module.exports = new UserModel();