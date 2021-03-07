const express = require("express");
const router = express.Router();
const {
  controllerAddUser,
  controllerGetAllUsers,
  controllerGetUserById,
  controllerUpdateDataUser,
  controllerDeleteUser,
} = require("../controllers/controller_users");

router
  .post("/register", controllerAddUser)
  .get("/", controllerGetAllUsers)
  .get("/:userId", controllerGetUserById)
  .put("/update/:userId", controllerUpdateDataUser)
  .delete("/delete/:userId", controllerDeleteUser);
module.exports = router;