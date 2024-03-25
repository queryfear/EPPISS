const Router = require("express");
const router = new Router();
const controller = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const {check} = require("express-validator")

router.post('/registration', [
    check("username", "Имя пользователя не должно быть пустым").notEmpty(),
    check("password", "Пароль должен быть не меньше 5 и не более 10 символов").isLength({min: 5, max: 10}),     
    ], controller.registration);
router.post('/login', controller.login);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;