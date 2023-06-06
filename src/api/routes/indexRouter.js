const gamesRoutes = require("./game");
const platformsRoutes = require("./platform");
const userRoutes = require("./user");

const indexRouter = require("express").Router();

indexRouter.use("/games", gamesRoutes);
indexRouter.use("/platforms", platformsRoutes);
indexRouter.use("/users", userRoutes);

module.exports = indexRouter;