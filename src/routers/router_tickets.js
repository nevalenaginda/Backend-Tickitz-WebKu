const express = require("express");
const Route = express.Router();
const {
  controllerGetTickets,
  controllerGetTicketById,
  controllerInsertTicket,
  controllerUpdateTicket,
  controllerDeleteTicket,
} = require("../controllers/controller_tickets");
Route.get("/", controllerGetTickets)
  .get("/:idTicket", controllerGetTicketById)
  .post("/", controllerInsertTicket)
  .put("/:idTicket", controllerUpdateTicket)
  .delete("/:idTicket", controllerDeleteTicket);
module.exports = Route;
