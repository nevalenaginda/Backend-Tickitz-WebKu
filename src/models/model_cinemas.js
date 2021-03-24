const connection = require('../configs/db')

const modelAddCinema = (data) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO tb_cinemas SET ?', data, (err, result) => {
      if (!err) {
        resolve(result)
      } else {
        reject(new Error(err))
      }
    })
  })
}

// Get All User
const modelGetAllCinemas = (search, order, pages) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM tb_cinemas ${search} ${order} ${pages}`,
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

// Read total cinema
const modelReadTotalCinemas = (search) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT COUNT(*) as total FROM tb_cinemas ${search} `,
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

const modelGetCinemaById = (idCinema) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM tb_cinemas WHERE id_cinema= ?',
      idCinema,
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

// model check id cinema
const modelCheckIdCinema = (idCinema) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM tb_cinemas WHERE id_cinema like ?',
      [idCinema],
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

const modelDeleteCinema = (idCinema) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM tb_cinemas WHERE id_cinema = ?',
      idCinema,
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

const modelUpdateDataCinema = (idCinema, data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE tb_cinemas SET ? WHERE id_cinema = ?',
      [data, idCinema],
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

module.exports = {
  modelAddCinema,
  modelGetCinemaById,
  modelUpdateDataCinema,
  modelCheckIdCinema,
  modelDeleteCinema,
  modelReadTotalCinemas,
  modelGetAllCinemas
}
