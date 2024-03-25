const sql = require("./DatabaseConnection");

class CategoryModel {
    async createDB() {
        const table = await sql`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                categoryName VARCHAR(50) UNIQUE,
                categoryDescription VARCHAR(50) UNIQUE
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

    async getName(id) {
        const name = await sql`
            SELECT categoryName FROM categories
            WHERE id = ${id};
        `;
        return name[0];
    }

    async getCategories() {
        const categories = await sql`
            SELECT * FROM categories
        `;
        return categories;
    }

    async checkCategory(categoryName) {
        const loginExist = await sql`
            SELECT categoryName FROM categories
            WHERE categoryName = ${categoryName};
        `;
        if (loginExist.length > 0) {
            throw new Error("Category already exists.")
        } else {
            return true;
        }
    }

    async getDescription(id) {
        const description = await sql`
            SELECT categoryDescription FROM categories
            WHERE id = ${id};
        `;
        return description[0];
    }   

    async addCategory(categoryName, categoryDescription) {
        await this.initializeDatabase();
    
        try {
            await this.checkCategory(categoryName);
        } catch(error) {
            console.error(error);
            return;
        }
    
        const categparams = await sql`
            INSERT INTO categories (categoryname, categorydescription)
            VALUES (${categoryName}, ${categoryDescription});
        `;
        
        return categparams;
    }
}

module.exports = new CategoryModel();