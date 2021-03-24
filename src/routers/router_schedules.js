const express = require('express')
const Route = express.Router()
const {
  authentification,
  authorizationAdmin,
  authorizationUser
} = require('../middlewares/auth')

const {
  controllerDeleteSchedule,
  controllerGetAllSchedules,
  controllerGetSceheduleById,
  controllerInsertSchedule,
  controllerUpdateSchedule
} = require('../controllers/controller_schedulues')

Route.get('/', controllerGetAllSchedules)
  .get('/:idSchedule', controllerGetSceheduleById)
  .post('/', authentification, authorizationAdmin, controllerInsertSchedule)
  .patch(
    '/:idSchedule',
    authentification,
    authorizationAdmin,
    controllerUpdateSchedule
  )
  .delete(
    '/:idSchedule',
    authentification,
    authorizationAdmin,
    controllerDeleteSchedule
  )
module.exports = Route
