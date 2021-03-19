const connection = require("../configs/db");

// Get All User table category
const modelGetAllUsers = (search, order, pages) => {
  console.log("search " + search + "order " + order + "pages " + pages);
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_users ${search} ${order} ${pages}`,
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
const modelReadTotalUsers = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total FROM tb_users ${search} `,
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

/// check email
const modelCheckEmail = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_users WHERE email like '${email}'`,
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

// model check id user
const modelCheckIdUser = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_user FROM tb_users WHERE id_user like ${idUser}`,
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
const modelGetUserById = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM tb_users WHERE id_user= ?",
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

const modelAddUser = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO tb_users SET ?", data, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(new Error(err));
      }
    });
  });
};

const modelUpdateDataUser = (idUser, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE tb_users SET ? WHERE id_user = ?",
      [data, idUser],
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

const modelDeleteUser = (idUser) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM tb_users WHERE id_user = ?",
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
  modelAddUser,
  modelGetAllUsers,
  modelUpdateDataUser,
  modelDeleteUser,
  modelGetUserById,
  modelReadTotalUsers,
  modelCheckIdUser,
  modelCheckEmail,
};
