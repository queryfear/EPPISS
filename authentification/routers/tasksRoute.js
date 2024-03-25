const Router = require("express");
const controller = require("../controllers/tasksContoller");
const router = new Router();

router.get("/:id", controller.getTasks);
router.post("/add", controller.addTask);
router.get("/task/:id", controller.getTask)

module.exports = router;