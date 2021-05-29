const express = require("express");
const Route = express.Router();
const {
  authentification,
  authorizationAdmin,
  authorizationUser,
} = require("../middlewares/auth");

const {
  controllerGetTickets,
  controllerGetTicketById,
  controllerInsertTicket,
  controllerUpdateTicket,
  controllerDeleteTicket,
  controllerGetAllDetailTicketById,
  controllerGetDetailTicketById,
} = require("../controllers/controller_tickets");
Route.get("/", authentification, controllerGetTickets)
  .get(
    "/all-detail/:idUser",
    authentification,
    controllerGetAllDetailTicketById
  )
  .get("/:idTicket", authentification, controllerGetTicketById)
  .get("/detail/:idTicket", authentification, controllerGetDetailTicketById)
  .post("/", authentification, controllerInsertTicket)
  .patch("/:idTicket", authentification, controllerUpdateTicket)
  .delete("/:idTicket", authentification, controllerDeleteTicket);
module.exports = Route;
