const { setError } = require("../../config/error");
const Platform = require("../model/platform");

const getAllPlatforms = async (req, res, next) => {
  try {
    const allPlatforms = await Platform.find().populate("games");
    return res.status(200).json(allPlatforms);
  } catch (error) {
    return next(setError(400, "Can't find platforms 🙄"));
  }
};

const getPlatformById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findById(id).populate("games");
    return res.status(200).json(platform);
  } catch (error) {
    return next(setError(400, "Can't find platform 🙄"));
  }
};

const createPlatform = async (req, res, next) => {
  try {
    const newPlatform = new Platform(req.body);
    const platformBBDD = await newPlatform.save();
    return res.status(201).json(platformBBDD);
  } catch (error) {
    return next(setError(400, "Can't create platform 🙄"));
  }
};

const deletePlatform = async (req, res, next) => {
  try {
    const { id } = req.params;
    const platform = await Platform.findByIdAndDelete(id);
    return res.status(200).json(platform);
  } catch (error) {
    return next(setError(400, "Can't delete platform 🙄"));
  }
};

const updatePlatform = async (req, res, next) => {
    try {
  
      const { id } = req.params;
  
      const oldPlatform = await Platform.findById(id);
  
      const newPlatform = new Platform(req.body);
  
      newPlatform._id = id;

      if (newPlatform.games) {
        newPlatform.games = [...oldPlatform.games, ...newPlatform.games];
      }
  
      const platformUpdated = await Platform.findByIdAndUpdate(id, newPlatform, { new: true });
  
      return res.status(200).json(platformUpdated);
  
    } catch (error) {
      return next(setError(400, "Can't update game 🙄"));
    }
  };

module.exports = {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  deletePlatform,
  updatePlatform
};
