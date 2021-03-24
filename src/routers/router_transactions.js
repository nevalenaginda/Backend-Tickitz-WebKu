const express = require('express')
const router = express.Router()
const {
  authentification,
  authorizationAdmin,
  authorizationUser
} = require('../middlewares/auth')
const {
  controllerAddTransaction,
  controllerGetAllTransactions,
  controllerGetTransactionById,
  controllerUpdateDataTransaction,
  controllerDeleteTransaction
} = require('../controllers/controller_transactions')

router
  .post('/', authentification, controllerAddTransaction)
  .get('/', authentification, controllerGetAllTransactions)
  .get('/:idTransaction', authentification, controllerGetTransactionById)
  .patch('/:idTransaction', authentification, controllerUpdateDataTransaction)
  .delete('/:idTransaction', authentification, controllerDeleteTransaction)
module.exports = router
