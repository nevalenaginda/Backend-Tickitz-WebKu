const connection = require("../configs/db");

const modelGetAllTickets = (data, search, pages) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_tickets  ${search} ${data} ${pages}`,
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
const modelReadTotalTickets = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total FROM tb_tickets ${search} `,
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

//read all detail ticket by id user
const modelGetAllDetailTickets = (id_user) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_tickets INNER JOIN tb_schedule_movies ON tb_tickets.id_schedule = tb_schedule_movies.id_schedule INNER JOIN tb_transactions ON tb_tickets.id_transaction = tb_transactions.id_transaction INNER JOIN tb_movies ON tb_schedule_movies.id_movie = tb_movies.id_movie INNER JOIN tb_cinemas ON tb_cinemas.id_cinema = tb_schedule_movies.id_cinema WHERE tb_tickets.id_user = '${id_user}' ORDER BY tb_tickets.created_at DESC`,
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

//read all detail ticket by id ticket
const modelGetDetailTickets = (id_ticket) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_tickets INNER JOIN tb_schedule_movies ON tb_tickets.id_schedule = tb_schedule_movies.id_schedule INNER JOIN tb_transactions ON tb_tickets.id_transaction = tb_transactions.id_transaction INNER JOIN tb_movies ON tb_schedule_movies.id_movie = tb_movies.id_movie INNER JOIN tb_cinemas ON tb_cinemas.id_cinema = tb_schedule_movies.id_cinema WHERE tb_tickets.id_ticket = ${id_ticket}`,
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

// model check id ticket
const modelCheckIdTicket = (idTicket) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_ticket FROM tb_tickets WHERE id_ticket like ${idTicket}`,
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
const modelGetTicketById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_tickets WHERE id_ticket= ?",
      id,
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

const modelInsertTicket = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO tb_tickets SET ?", data, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};

const modelUpdateTicket = (idTicket, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE tb_tickets SET ? WHERE id_ticket = ?",
      [data, idTicket],
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

const modelDeleteTicket = (idTicket) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM tb_tickets WHERE id_ticket = ?",
      idTicket,
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

module.exports = {
  modelDeleteTicket,
  modelUpdateTicket,
  modelInsertTicket,
  modelGetAllTickets,
  modelGetTicketById,
  modelReadTotalTickets,
  modelCheckIdTicket,
  modelGetDetailTickets,
  modelGetAllDetailTickets,
};
