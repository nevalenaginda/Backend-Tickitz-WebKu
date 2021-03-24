const express = require('express')
const Route = express.Router()
const {
  authentification,
  authorizationAdmin,
  authorizationUser
} = require('../middlewares/auth')
const { singleUploadimg } = require('../middlewares/multerUpload')

const {
  controllerAddCinema,
  controllerGetAllCinemas,
  controllerGetCinemaById,
  controllerUpdateCinema,
  controllerDeleteCinema
} = require('../controllers/controller_cinemas')

Route.post(
  '/',
  authentification,
  authorizationAdmin,
  singleUploadimg,
  controllerAddCinema
)
  .get('/', authentification, controllerGetAllCinemas)
  .get('/:idCinema', authentification, controllerGetCinemaById)
  .patch(
    '/:idCinema',
    authentification,
    authorizationAdmin,
    singleUploadimg,
    controllerUpdateCinema
  )
  .delete(
    '/:idCinema',
    authentification,
    authorizationAdmin,
    controllerDeleteCinema
  )

module.exports = Route
