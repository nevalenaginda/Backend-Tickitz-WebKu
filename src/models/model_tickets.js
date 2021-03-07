const connection = require("../configs/db");

const modelGetAllTickets = (data, search, pages) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT tb_tickets.id_tiket, tb_tickets.id_user, tb_movies.movie_title, tb_tickets.price ,tb_tickets.location, tb_tickets.cinema_name, tb_tickets.ticket_status, tb_tickets.seats, tb_tickets.count, tb_tickets.date_time, tb_tickets.updated_at, tb_tickets.created_at FROM tb_tickets INNER JOIN tb_movies ON tb_tickets.id_film = tb_movies.id_movie  ${search} ${data} ${pages}`,
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
      `SELECT COUNT(*) as total FROM tb_tickets INNER JOIN tb_movies ON tb_tickets.id_film = tb_movies.id_movie ${search} `,
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

// model check id ticket
const modelCheckIdTicket = (idTicket) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_tiket FROM tb_tickets WHERE id_tiket like ${idTicket}`,
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
      "SELECT * FROM tb_tickets WHERE id= ?",
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
      "UPDATE tb_tickets SET ? WHERE id_tiket = ?",
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
      "DELETE FROM tb_tickets WHERE id_tiket = ?",
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
};
