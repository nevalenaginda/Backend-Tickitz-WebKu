const connection = require("../configs/db");

const modelGetAllTransactions = (data, search, pages) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT tb_transactions.id_transaction, tb_tickets.id_tiket, tb_users.full_name, tb_users.email, tb_movies.movie_title, tb_tickets.price ,tb_tickets.location, tb_tickets.cinema_name, tb_tickets.ticket_status, tb_tickets.seats, tb_tickets.count, tb_tickets.date_time AS date_time_movies, tb_transactions.total_payment, tb_transactions.payment_methods, tb_transactions.status_payment, tb_transactions.created_at, tb_transactions.updated_at FROM (((tb_transactions INNER JOIN tb_movies ON tb_transactions.id_movie= tb_movies.id_movie) INNER JOIN tb_users ON tb_transactions.id_user = tb_users.id_user) INNER JOIN tb_tickets ON tb_transactions.id_ticket = tb_tickets.id_tiket) ${search} ${data} ${pages}`,
      (err, results) => {
        if (!err) {
          resolve(results);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

/// Read all field table tickets and show pages
const modelReadTotalTransactions = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total FROM tb_transactions INNER JOIN tb_movies ON tb_transactions.id_movie = tb_movies.id_movie ${search} `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      }
    );
  });
};

// SELECT * FROM `tickets` WHERE id=1
const modelGetTransactionById = (idTransaction) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT tb_transactions.id_transaction, tb_tickets.id_tiket, tb_users.full_name, tb_users.email, tb_movies.movie_title, tb_tickets.price ,tb_tickets.location, tb_tickets.cinema_name, tb_tickets.ticket_status, tb_tickets.seats, tb_tickets.count, tb_tickets.date_time AS date_time_movies, tb_transactions.total_payment, tb_transactions.payment_methods, tb_transactions.status_payment, tb_transactions.created_at, tb_transactions.updated_at FROM (((tb_transactions INNER JOIN tb_movies ON tb_transactions.id_movie= tb_movies.id_movie) INNER JOIN tb_users ON tb_transactions.id_user = tb_users.id_user) INNER JOIN tb_tickets ON tb_transactions.id_ticket = tb_tickets.id_tiket) WHERE id_transaction= ?",
      idTransaction,
      (err, results) => {
        if (!err) {
          resolve(results);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const modelAddTransaction = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO tb_transactions  SET ?",
      data,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const modelUpdateDataTransaction = (idTransaction, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE tb_transactions  SET ? WHERE id_transaction = ?",
      [data, idTransaction],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const modelDeleteTransaction = (idTransaction) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM tb_transactions  WHERE id_transaction = ?",
      idTransaction,
      (err, results) => {
        if (!err) {
          resolve(results);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const modelCheckIdTransaction = (idTransaction) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_transaction FROM tb_transactions WHERE id_transaction like ${idTransaction}`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(new Error(error));
        }
      }
    );
  });
};

module.exports = {
  modelUpdateDataTransaction,
  modelDeleteTransaction,
  modelGetTransactionById,
  modelAddTransaction,
  modelGetAllTransactions,
  modelReadTotalTransactions,
  modelCheckIdTransaction,
};
