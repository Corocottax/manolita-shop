const { isAuth } = require("../../middlewares/auth");
const { register, login } = require("../controller/user");

const userRoutes = require("express").Router();

userRoutes.post("/register", [isAuth], register);
userRoutes.post("/login", login);

module.exports = userRoutes;