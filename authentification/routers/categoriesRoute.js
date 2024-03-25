const Router = require("express");
const controller = require("../controllers/categoriesController");
const router = new Router();

router.get("/getCategories", controller.getCategories);

module.exports = router;