const express = require("express");
const Route = express.Router();
const {
  controllerGetAllMovies,
  controllerGetMovieById,
  controllerInsertMovie,
  controllerUpdateMovie,
  controllerDeleteMovie,
} = require("../controllers/controller_movies");

Route.get("/", controllerGetAllMovies)
  .get("/:idMovie", controllerGetMovieById)
  .post("/", controllerInsertMovie)
  .patch("/:idMovie", controllerUpdateMovie)
  .delete("/:idMovie", controllerDeleteMovie);
module.exports = Route;
