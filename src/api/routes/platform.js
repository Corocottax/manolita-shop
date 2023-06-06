const { isAuth } = require("../../middlewares/auth");
const { getAllPlatforms, getPlatformById, createPlatform, updatePlatform, deletePlatform } = require("../controller/platform");

const platformsRoutes = require("express").Router();

platformsRoutes.get("/", getAllPlatforms);
platformsRoutes.get("/:id", getPlatformById);
platformsRoutes.post("/", [isAuth], createPlatform);
platformsRoutes.put("/:id", [isAuth], updatePlatform);
platformsRoutes.delete("/:id", [isAuth], deletePlatform);

module.exports = platformsRoutes;