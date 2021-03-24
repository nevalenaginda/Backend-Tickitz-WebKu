const express = require('express')
const Route = express.Router()
const {
  authentification,
  authorizationAdmin,
  authorizationUser
} = require('../middlewares/auth')

const {
  controllerGetTickets,
  controllerGetTicketById,
  controllerInsertTicket,
  controllerUpdateTicket,
  controllerDeleteTicket
} = require('../controllers/controller_tickets')
Route.get('/', authentification, controllerGetTickets)
  .get('/:idTicket', authentification, controllerGetTicketById)
  .post('/', authentification, controllerInsertTicket)
  .patch('/:idTicket', authentification, controllerUpdateTicket)
  .delete('/:idTicket', authentification, controllerDeleteTicket)
module.exports = Route
