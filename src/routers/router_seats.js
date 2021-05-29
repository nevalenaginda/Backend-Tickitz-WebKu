const express = require("express");
const Route = express.Router();
const { verifyAccess } = require("../middlewares/auth");
const {
  authentification,
  authorizationAdmin,
  authorizationUser,
} = require("../middlewares/auth");

const {
  controllerAddSeat,
  controllerGetAllSeats,
  controllerGetSeatById,
  controllerUpdateSeat,
  controllerDeleteSeat,
  controllerGetSeatBySchedule,
} = require("../controllers/controller_seats");

Route.post("/", authentification, controllerAddSeat)
  .get("/", authentification, controllerGetAllSeats)
  .get("/schedule/:idSchedule", authentification, controllerGetSeatBySchedule)
  .get("/:idSeat", authentification, controllerGetSeatById)
  .patch("/:idSeat", authentification, controllerUpdateSeat)
  .delete("/:idSeat", authentification, controllerDeleteSeat);

module.exports = Route;
