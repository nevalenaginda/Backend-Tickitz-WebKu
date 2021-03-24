const express = require("express");
const Route = express.Router();
const {
  authentification,
  authorizationAdmin,
  authorizationUser,
} = require("../middlewares/auth");

const {
  clearNowAndUp,
  cacheNowShowing,
  cacheUpComing,
} = require("../middlewares/redisUpAndShow");

const {
  controllerDeleteSchedule,
  controllerGetAllSchedules,
  controllerGetSceheduleById,
  controllerInsertSchedule,
  controllerUpdateSchedule,
  controllerGetAllDetailSchedules,
  controllerNowShowing,
  controllerUpComing,
} = require("../controllers/controller_schedulues");

Route.get("/", controllerGetAllSchedules)
  .get("/detail", controllerGetAllDetailSchedules)
  .get("/now", cacheNowShowing, controllerNowShowing)
  .get("/up", cacheUpComing, controllerUpComing)
  .get("/:idSchedule", controllerGetSceheduleById)
  .post(
    "/",
    authentification,
    authorizationAdmin,
    clearNowAndUp,
    controllerInsertSchedule
  )
  .patch(
    "/:idSchedule",
    authentification,
    authorizationAdmin,
    clearNowAndUp,
    controllerUpdateSchedule
  )
  .delete(
    "/:idSchedule",
    authentification,
    authorizationAdmin,
    clearNowAndUp,
    controllerDeleteSchedule
  );
module.exports = Route;
