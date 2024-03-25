const categoryModel = require("../models/category-model")

class CategoriesController {
    async addCategory(req, res) {
        try {
            const { name, description } = req.body
            await categoryModel.addCategory(name, description)
            return res.status(200).json({message: "Все ок"});
        } catch(e) {
            res.status(400).json({message: "Что-то пошло не так"})
        }   
    }
    async getCategories(req, res) {
        try {
            const categories = await categoryModel.getCategories();
            return res.render("categories", {categories: categories});
        } catch(e) {
            res.status(400).json({message: "Что-то пошло не так"})
        }    
    }
}

module.exports = new CategoriesController();