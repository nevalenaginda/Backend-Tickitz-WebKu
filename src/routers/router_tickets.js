const express = require("express");
const router = express.Router();
const {
  controllerGetTickets,
  controllerGetTicketById,
  controllerInsertTicket,
  controllerUpdateTicket,
  controllerDeleteTicket,
} = require("../controllers/controller_tickets");
router
  .get("/", controllerGetTickets)
  .get("/:idTicket", controllerGetTicketById)
  .post("/insert/", controllerInsertTicket)
  .put("/update/:idTicket", controllerUpdateTicket)
  .delete("/delete/:idTicket", controllerDeleteTicket);
module.exports = router;
