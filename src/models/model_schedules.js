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
    connection.query(
      "SELECT * FROM tb_schedule_movies WHERE id_schedule= ?",
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

const modelGetAllDetailSchedules = (search, order, pages) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT tb_schedule_movies.id_schedule, tb_schedule_movies.id_movie, tb_schedule_movies.id_cinema, tb_schedule_movies.playing_time, tb_schedule_movies.playing_date, tb_movies.movie_title, tb_movies.image, tb_movies.synopsis, tb_movies.genre, tb_movies.duration_minutes, tb_movies.duration_hours, tb_movies.casts, tb_movies.director, tb_movies.release_date, tb_cinemas.cinema_name, tb_cinemas.logo_cinema, tb_cinemas.address_cinema, tb_cinemas.city_cinema FROM tb_schedule_movies LEFT JOIN tb_movies ON tb_schedule_movies.id_movie = tb_movies.id_movie LEFT JOIN tb_cinemas ON tb_cinemas.id_cinema = tb_schedule_movies.id_cinema ${search} ${order} ${pages}`,
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

const modelReadTotalDetailSchedules = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total FROM tb_schedule_movies LEFT JOIN tb_movies ON tb_schedule_movies.id_movie = tb_movies.id_movie LEFT JOIN tb_cinemas ON tb_cinemas.id_cinema = tb_schedule_movies.id_cinema  ${search} `,
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

// WHERE tb_cinemas.city_cinema=${city} AND tb_schedule_movies.playing_date = ${date}
module.exports = {
  modelAddSchedule,
  modelCheckIdSchedule,
  modelDeleteSchedule,
  modelGetAllSchedules,
  modelGetScheduleById,
  modelReadTotalSchedule,
  modelUpdateDataSchedule,
  modelGetAllDetailSchedules,
  modelReadTotalDetailSchedules,
};
