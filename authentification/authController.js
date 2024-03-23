const jwt = require("jsonwebtoken");
const {setUser} = require("./database/userRegistration");
const {getUser, getPassword, allUsers, allPasswords} = require("./database/getFunctions")
const {secret} = require("./config");
const bcrypt = require("bcryptjs")
const { validationResult } = require("express-validator")

const generateAccessToken = (name, role) => {
    const payload = {
        name,
        role
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"});
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибки при регистрации"})
            }
            const {username, password} = req.body;
            const hashPassword = bcrypt.hashSync(password, 7)
            await setUser(username, hashPassword);
            return res.status(200).json({message: "Все ок"});
        }
        catch(e) {

        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const login = await getUser(username);
            if(!login) {
                return res.json({message: "Такой пользователь не существует"});
            };
            const validPassword = await getPassword(username);
            const passwordIsCorrect = bcrypt.compareSync(password, validPassword)
            if(!passwordIsCorrect) {
                return res.json({message: "Пароль неверный", password: password, hash: validPassword});
            }
            const token = generateAccessToken(username, "user");
            return res.json({token});
        }
        catch(e) {
        
        }
    }

    async getUsers(req, res) {
        try {
            const users = await allUsers();
            console.log(users);
            res.json("server work");
        }
        catch(e) {
            console.log(typeof allUsers);
            res.status(404).send("Что-то пошло не так");
        }
    }
}

module.exports = new authController();