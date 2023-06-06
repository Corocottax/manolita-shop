//! express es para temas del server
const express = require("express");
require("dotenv").config();
const { connectDB } = require("./src/config/db");
const { setError } = require("./src/config/error");
const indexRouter = require("./src/api/routes/indexRouter");
const cloudinary = require("cloudinary").v2;

const server = express();

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

server.use(express.json());

server.use("/api/v1", indexRouter);

server.use("*", (req, res, next) => {
    return next(setError(404, "Not Found")); /* res.status(404).json("No tengo nada que ofrecerte 🤐"); */
})

server.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || "Internal server error")
})

server.listen(3000, () => {
    console.log("Estoy escuchando en: http://localhost:3000");
});