const User = require("../api/model/user");
const { setError } = require("../config/error");
const { verifyJwt } = require("../config/jwt");

const isAuth = async (req, res, next) => {
  try {

    const token = req.headers.authorization;

    if (!token) {
        return next(setError(400, "A donde vas flipao, no tienes permisos"));
    }

    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken);
    const userLogued = await User.findById(validToken.id);

    userLogued.password = null;
    req.user = userLogued;
    next();

  } catch (error) {
    return next(setError(400, "La llave no era la correcta"));
  }
};

module.exports = { isAuth };
