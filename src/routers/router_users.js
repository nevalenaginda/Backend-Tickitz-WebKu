const express = require("express");
const Route = express.Router();
const {
  controllerAddUser,
  controllerGetAllUsers,
  controllerGetUserById,
  controllerUpdateDataUser,
  controllerUpdateDataUser2,
  controllerDeleteUser,
  controllerLogin,
} = require("../controllers/controller_users");

Route.post("/register", controllerAddUser)
  .post("/login", controllerLogin)
  .get("/", controllerGetAllUsers)
  .get("/:userId", controllerGetUserById)
  .put("/:userId", controllerUpdateDataUser)
  .patch("/:userId", controllerUpdateDataUser2)
  .delete("/:userId", controllerDeleteUser);
module.exports = Route;
