const express = require("express");
const Route = express.Router();
const {
  authentification,
  authorizationAdmin,
  authorizationUser,
} = require("../middlewares/auth");
const { singleUploadimg } = require("../middlewares/multerUpload");

const {
  controllerAddUser,
  controllerGetAllUsers,
  controllerGetUserById,
  controllerUpdateDataUser,
  controllerUpdateDataUser2,
  controllerDeleteUser,
  controllerLogin,
  controllerActivation,
  controllerGetProfile,
} = require("../controllers/controller_users");

Route.post("/register", controllerAddUser)
  .post("/login", controllerLogin)
  .get("/activate/:token/:email", controllerActivation)
  .get("/profile", authentification, controllerGetProfile)
  .get("/", authentification, controllerGetAllUsers)
  .get("/:userId", authentification, controllerGetUserById)
  .put("/:userId", authentification, controllerUpdateDataUser)
  .patch(
    "/:userId",
    authentification,
    singleUploadimg,
    controllerUpdateDataUser2
  )
  .delete("/:userId", authentification, controllerDeleteUser);
module.exports = Route;
