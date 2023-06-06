const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    games: [{ type: mongoose.Types.ObjectId, ref: "games"}]
  },
  {
    collection: "plaforms",
    timestamps: true
  }
);

const Platform = mongoose.model("platforms", platformSchema);
module.exports = Platform;