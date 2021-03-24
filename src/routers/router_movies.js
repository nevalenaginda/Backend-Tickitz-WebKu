const express = require('express')
const Route = express.Router()
const { singleUploadimg } = require('../middlewares/multerUpload')
const { getAllMovies } = require('../middlewares/redisMovies')
const {
  authentification,
  authorizationAdmin,
  authorizationUser
} = require('../middlewares/auth')

const {
  controllerGetAllMovies,
  controllerGetMovieById,
  controllerInsertMovie,
  controllerUpdateMovie,
  controllerDeleteMovie
} = require('../controllers/controller_movies')

Route.get('/', getAllMovies, controllerGetAllMovies)
  .get('/:idMovie', controllerGetMovieById)
  .post(
    '/',
    authentification,
    authorizationAdmin,
    singleUploadimg,
    controllerInsertMovie
  )
  .patch(
    '/:idMovie',
    authentification,
    authorizationAdmin,
    singleUploadimg,
    controllerUpdateMovie
  )
  .delete(
    '/:idMovie',
    authentification,
    authorizationAdmin,
    controllerDeleteMovie
  )
module.exports = Route
