const express = require('express')
const router = express.Router()
const {
  controllerAddTransaction,
  controllerGetAllTransactions,
  controllerGetTransactionById,
  controllerUpdateDataTransaction,
  controllerDeleteTransaction
} = require('../controllers/controller_transactions')

router
  .post('/', controllerAddTransaction)
  .get('/', controllerGetAllTransactions)
  .get('/:idTransaction', controllerGetTransactionById)
  .put('/:idTransaction', controllerUpdateDataTransaction)
  .delete('/:idTransaction', controllerDeleteTransaction)
module.exports = router
