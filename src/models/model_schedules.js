const connection = require("../configs/db");

// Get All User table category
const modelGetAllSchedules = (search, order, pages) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_schedule_movies ${search} ${order} ${pages}`,
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

/// / Read all field table user and show pages
const modelReadTotalSchedule = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total FROM tb_schedule_movies ${search} `,
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

const modelCheckIdSchedule = (idSchedule) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_schedule FROM tb_schedule_movies WHERE id_schedule like ${idSchedule}`,
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
const modelGetScheduleById = (idSchedule) => {
  return new Promise((resolve, reject) => {
    // console.log("ini jalan");
    connection.query(
      "SELECT * FROM tb_schedule_movies WHERE id_schedule= ?",
      idSchedule,
      (err, results) => {
        if (!err) {
          resolve(results);
          console.log(results);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};

const modelAddSchedule = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO tb_schedule_movies SET ?",
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

const modelUpdateDataSchedule = (idSchedule, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE tb_schedule_movies SET ? WHERE id_schedule = ?",
      [data, idSchedule],
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

const modelDeleteSchedule = (idSchedule) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM tb_schedule_movies WHERE id_schedule = ?",
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

module.exports = {
  modelAddSchedule,
  modelCheckIdSchedule,
  modelDeleteSchedule,
  modelGetAllSchedules,
  modelGetScheduleById,
  modelReadTotalSchedule,
  modelUpdateDataSchedule,
};
