const connection = require("../configs/db");

const modelAddSeat = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO tb_seats SET ?", data, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};

// Get All User
const modelGetAllSeats = (search, order, pages) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_seats ${search} ${order} ${pages}`,
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

// Read total Seat
const modelReadTotalSeats = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total FROM tb_seats ${search} `,
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

const modelGetSeatById = (idSeat) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_seats WHERE id_seat= ?",
      idSeat,
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

const modelGetSeatByIdSchedule = (idSchedule) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_seats WHERE id_schedule= ?",
      idSchedule,
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

// model check id Seat
const modelCheckIdSeat = (idSeat) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_seats WHERE id_seat like ?",
      [idSeat],
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

const modelDeleteSeat = (idSeat) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM tb_seats WHERE id_seat = ?",
      idSeat,
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

const modelUpdateDataSeat = (idSeat, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE tb_seats SET ? WHERE id_seat = ?",
      [data, idSeat],
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

module.exports = {
  modelAddSeat,
  modelGetSeatById,
  modelUpdateDataSeat,
  modelCheckIdSeat,
  modelDeleteSeat,
  modelReadTotalSeats,
  modelGetAllSeats,
  modelGetSeatByIdSchedule,
};
