const connection = require("../configs/db");

// Get All User table category
const modelGetAllMovies = (search, order, pages) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_movies ${search} ${order} ${pages}`,
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
const modelReadTotalMovies = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total FROM tb_movies ${search} `,
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

const modelCheckIdMovie = (idMovie) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_movie FROM tb_movies WHERE id_movie like ${idMovie}`,
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
const modelGetMovieById = (idMovie) => {
  return new Promise((resolve, reject) => {
    // console.log("ini jalan");
    connection.query(
      "SELECT * FROM tb_movies WHERE id_movie= ?",
      idMovie,
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

const modelAddMovie = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO tb_movies SET ?", data, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};

const modelUpdateDataMovie = (idMovie, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE tb_movies SET ? WHERE id_movie = ?",
      [data, idMovie],
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

const modelDeleteMovie = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM tb_movies WHERE id_movie = ?",
      idUser,
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
  modelAddMovie,
  modelGetAllMovies,
  modelUpdateDataMovie,
  modelDeleteMovie,
  modelGetMovieById,
  modelReadTotalMovies,
  modelCheckIdMovie,
};
