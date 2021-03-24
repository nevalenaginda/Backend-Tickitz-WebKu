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
} = require("../controllers/controller_users");

Route.post("/register", controllerAddUser)
  .post("/login", controllerLogin)
  .get("/activate/:token/:email", controllerActivation)
  .get("/", authentification, controllerGetAllUsers)
  .get("/:userId", authentification, controllerGetUserById)
  .put(
    "/:userId",
    authentification,
    authorizationUser,
    controllerUpdateDataUser
  )
  .patch(
    "/:userId",
    authentification,
    authorizationUser,
    singleUploadimg,
    controllerUpdateDataUser2
  )
  .delete(
    "/:userId",
    authentification,
    authorizationAdmin,
    controllerDeleteUser
  );
module.exports = Route;
