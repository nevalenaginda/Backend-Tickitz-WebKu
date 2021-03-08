const express = require('express')
const router = express.Router()
const {
  controllerGetTickets,
  controllerGetTicketById,
  controllerInsertTicket,
  controllerUpdateTicket,
  controllerDeleteTicket
} = require('../controllers/controller_tickets')
router
  .get('/', controllerGetTickets)
  .get('/:idTicket', controllerGetTicketById)
  .post('/', controllerInsertTicket)
  .put('/:idTicket', controllerUpdateTicket)
  .delete('/:idTicket', controllerDeleteTicket)
module.exports = router
