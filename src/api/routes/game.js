const { isAuth } = require("../../middlewares/auth");
const upload = require("../../middlewares/file");
const { getAllGames, getGameById, createGame, updateGame, deleteGame } = require("../controller/game");

const gamesRoutes = require("express").Router();

gamesRoutes.get("/", getAllGames);
gamesRoutes.get("/:id", getGameById);
gamesRoutes.post("/", [isAuth], upload.single("cover"), createGame);
gamesRoutes.put("/:id", [isAuth], upload.single("cover"), updateGame);
gamesRoutes.delete("/:id", [isAuth], deleteGame);

module.exports = gamesRoutes;