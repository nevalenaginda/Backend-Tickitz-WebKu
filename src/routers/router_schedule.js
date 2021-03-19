const express = require("express");
const Route = express.Router();
const {
  controllerDeleteSchedule,
  controllerGetAllSchedules,
  controllerGetSceheduleById,
  controllerInsertSchedule,
  controllerUpdateSchedule,
} = require("../controllers/controller_schedulues");

Route.get("/", controllerGetAllSchedules)
  .get("/:idSchedule", controllerGetSceheduleById)
  .post("/", controllerInsertSchedule)
  .patch("/:idSchedule", controllerUpdateSchedule)
  .delete("/:idSchedule", controllerDeleteSchedule);
module.exports = Route;
