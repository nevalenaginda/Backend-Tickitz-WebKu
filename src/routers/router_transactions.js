const express = require("express");
const router = express.Router();
const {
  controllerAddTransaction,
  controllerGetAllTransactions,
  controllerGetTransactionById,
  controllerUpdateDataTransaction,
  controllerDeleteTransaction,
} = require("../controllers/controller_transactions");

router
  .post("/add/", controllerAddTransaction)
  .get("/", controllerGetAllTransactions)
  .get("/:idTransaction", controllerGetTransactionById)
  .put("/update/:idTransaction", controllerUpdateDataTransaction)
  .delete("/delete/:idTransaction", controllerDeleteTransaction);
module.exports = router;
