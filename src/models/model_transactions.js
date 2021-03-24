const connection = require('../configs/db')

const modelGetAllTransactions = (data, search, pages) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_transactions ${search} ${data} ${pages}`,
      (err, results) => {
        if (!err) {
          resolve(results)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

/// Read all field table tickets and show pages
const modelReadTotalTransactions = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total FROM tb_transactions  ${search} `,
      (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      }
    )
  })
}

// SELECT * FROM `tickets` WHERE id=1
const modelGetTransactionById = (idTransaction) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM tb_transactions WHERE id_transaction= ?',
      idTransaction,
      (err, results) => {
        if (!err) {
          resolve(results)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const modelAddTransaction = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'INSERT INTO tb_transactions  SET ?',
      data,
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const modelUpdateDataTransaction = (idTransaction, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE tb_transactions  SET ? WHERE id_transaction = ?',
      [data, idTransaction],
      (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const modelDeleteTransaction = (idTransaction) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM tb_transactions  WHERE id_transaction = ?',
      idTransaction,
      (err, results) => {
        if (!err) {
          resolve(results)
        } else {
          reject(new Error(err))
        }
      }
    )
  })
}

const modelCheckIdTransaction = (idTransaction) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_transaction FROM tb_transactions WHERE id_transaction like ${idTransaction}`,
      (error, result) => {
        if (!error) {
          resolve(result)
        } else {
          reject(new Error(error))
        }
      }
    )
  })
}

module.exports = {
  modelUpdateDataTransaction,
  modelDeleteTransaction,
  modelGetTransactionById,
  modelAddTransaction,
  modelGetAllTransactions,
  modelReadTotalTransactions,
  modelCheckIdTransaction
}
