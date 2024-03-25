const sql = require("./DatabaseConnection");

class TaskModel {
    async createDB() {
        const table = await sql`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                idCateg INT,
                name VARCHAR(50) UNIQUE,
                description VARCHAR(50) UNIQUE
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

    async getTask(id) {
        const task = await sql`
            SELECT * FROM tasks
            WHERE id = ${id};
        `;
        return task[0];
    }

    async checkTask(taskName) {
        const taskExist = await sql`
            SELECT name FROM tasks
            WHERE name = ${taskName};
        `;
        if (loginExist.length > 0) {
            throw new Error("task already exists.")
        } else {
            return true;
        }
    }

    async getAllTasks(id) {
        const tasks = await sql`
            SELECT * FROM tasks
            WHERE id = ${id};
        `;
        return tasks;
    }

    async getDescription(id) {
        const description = await sql`
            SELECT description FROM tasks
            WHERE id = ${id};
        `;
        return description[0];
    }   

    async addTask(taskName, taskDescription, categId) {
        await this.initializeDatabase();
    
        // try {
        //     await this.checkTask(taskName);
        // } catch(error) {
        //     console.error(error);
        //     return;
        // }
    
        const taskparams = await sql`
            INSERT INTO tasks ( name, description, idcategory )
            VALUES ( ${taskName}, ${taskDescription}, ${categId});
        `;
        
        return taskparams;
    }
}

module.exports = new TaskModel()