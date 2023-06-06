const { setError } = require("../../config/error");
const { deleteFile } = require("../../middlewares/deleteFile");
const Game = require("../model/game");

//! CRUD -> CREATE READ UPDATE DELETE

const getAllGames = async (req, res, next) => {
  try {
    const allGames = await Game.find();
    return res.status(200).json(allGames);
  } catch (error) {
    return next(setError(400, "Can't find games 🙄"));
  }
};

const getGameById = async (req, res, next) => {
  try {

    const { id } = req.params;
    const game = await Game.findById(id);
    return res.status(200).json(game);

  } catch (error) {
    return next(setError(400, "Can't find game 🙄"));
  }
};

const createGame = async (req, res, next) => {
  try {

    const newGame = new Game(req.body);

    if (req.file) {
      newGame.cover = req.file.path;
    }

    const gameBBDD = await newGame.save();
    return res.status(201).json(gameBBDD);

  } catch (error) {
    return next(setError(400, "Can't create game 🙄"));
  }
};

const updateGame = async (req, res, next) => {
  try {

    const { id } = req.params;

    const oldGame = await Game.findById(id);

    const newGame = new Game(req.body);

    if (req.file) {
      newGame.cover = req.file.path;
      if (oldGame.cover) {
        deleteFile(oldGame.cover);
      }
    }

    newGame._id = id;

    if (newGame.platforms) {
        newGame.platforms = [...oldGame.platforms, ...newGame.platforms];
    }

    const gameUpdated = await Game.findByIdAndUpdate(id, newGame, { new: true });

    return res.status(200).json(gameUpdated);

  } catch (error) {
    return next(setError(400, "Can't update game 🙄"));
  }
};

const deleteGame = async (req, res, next) => {
  try {

    const { id } = req.params;
    const game = await Game.findByIdAndDelete(id);
    return res.status(200).json(game);

  } catch (error) {
    return next(setError(400, "Can't delete game 🙄"));
  }
};

module.exports = {
  getAllGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
};
