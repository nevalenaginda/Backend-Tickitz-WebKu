const {
  modelAddMovie,
  modelGetAllMovies,
  modelUpdateDataMovie,
  modelCheckIdMovie,
  modelDeleteMovie,
  modelGetMovieById,
  modelReadTotalMovies,
  modelGetAllMoviesRedis
} = require('../models/model_movies')
const { envPORT } = require('../helpers/env')
const { response } = require('../helpers/response')

const redisClient = require('../configs/redis')

const setDataRedis = () => {
  modelGetAllMoviesRedis()
    .then((response) => {
      // console.log(response);
      const data = JSON.stringify(response)
      redisClient.set('dataAllMovies', data)
    })
    .catch((error) => {
      console.log(error.message)
    })
}

// Insert
const controllerInsertMovie = async (req, res) => {
  const {
    movie_title,
    synopsis,
    genre,
    duration_hours,
    duration_minutes,
    casts,
    director,
    category,
    release_date
  } = req.body

  if (
    !movie_title ||
    !synopsis ||
    !genre ||
    !duration_hours ||
    !duration_minutes ||
    !casts ||
    !director ||
    !category ||
    !release_date
  ) {
    return response(res, [], {}, 401, {
      message: 'Failed to  add data movie. All data cannot be empty.',
      error: null
    })
  } else {
    const image = req.file
      ? `http://localhost:${envPORT}/img/${req.file.filename}`
      : `http://localhost:${envPORT}/img/default_poster.jpg`
    const data = {
      movie_title,
      image,
      synopsis,
      genre,
      duration_hours,
      duration_minutes,
      casts,
      director,
      category,
      release_date,
      created_at: new Date(),
      updated_at: new Date()
    }

    modelAddMovie(data)
      .then((result) => {
        console.log('Success insert movie')
        setDataRedis()
        return response(res, [data], {}, 201, {
          message: 'Success insert movie.',
          error: null
        })
      })
      .catch((err) => {
        console.log(err.message)
        return response(res, [], {}, 500, {
          message: 'Internal server error',
          error: err.message
        })
      })
  }
}

// Read All
const controllerGetAllMovies = async (req, res) => {
  try {
    // sort && methode (ASC, DESC)
    const sortby = req.query['sort-by'] ? req.query['sort-by'] : ''
    const order = req.query.order ? req.query.order : 'desc'
    const data = sortby ? `ORDER BY ${sortby} ${order}` : ''

    // searcing name
    const searchby = req.query['search-by']
    const item = req.query.item
    const search = item ? `WHERE ${searchby} LIKE '%${item}%'` : ' '

    // pagination
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 20
    const start = page === 1 ? 0 : (page - 1) * limit
    const pages = page ? `LIMIT ${start}, ${limit}` : ''

    // total page
    const totalPage = await modelReadTotalMovies(search)

    modelGetAllMovies(data, search, pages)
      .then((result) => {
        if (result.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit)
          }
          module.exports.setDataRedis()
          console.log('Success get data movie')
          return response(res, result, pagination, 200, {
            message: 'Success get data movie from server',
            error: null
          })
        } else {
          console.log('Oops, data not found')
          return response(res, [], {}, 404, {
            message: 'Oops, data not found',
            error: null
          })
        }
      })
      .catch((err) => {
        console.log(err.message)
        return response(res, [], {}, 500, {
          message: 'Internal server error',
          error: err.message
        })
      })
  } catch (err) {
    console.log(err.message)
    return response(res, [], {}, 500, {
      message: 'Internal server error',
      error: err.message
    })
  }
}

// Read Movie by id
const controllerGetMovieById = (req, res) => {
  const idMovie = req.params.idMovie
  modelGetMovieById(idMovie)
    .then((result) => {
      if (result.length > 0) {
        return response(res, result, {}, 200, {
          message: `Success get data movie with id ${idMovie}`,
          error: null
        })
      } else {
        return response(res, [], {}, 404, {
          message: 'Oops, data not found!',
          error: null
        })
      }
    })
    .catch((err) => {
      console.log(err.message)
      return response(res, [], {}, 500, {
        message: 'Internal server error!',
        error: err.message
      })
    })
}

// Update movie
const controllerUpdateMovie = async (req, res) => {
  const idMovie = req.params.idMovie
  try {
    const checkIdMovie = await modelCheckIdMovie(idMovie)
    if (checkIdMovie.length !== 0) {
      data = req.body
      data.updated_at = new Date()
      const last_image = await modelGetMovieById(idMovie)
      data.image = req.file
        ? `http://localhost:${envPORT}/img/${req.file.filename}`
        : last_image[0].image

      modelUpdateDataMovie(idMovie, data)
        .then((result) => {
          setDataRedis()
          return response(res, [data], {}, 200, {
            message: `Succes update data movie with id ${idMovie}`,
            error: null
          })
        })
        .catch((err) => {
          console.log(err.message)
          return response(res, [], {}, 500, {
            message: 'Internal server error!',
            error: err.message
          })
        })
    } else {
      return response(res, [], {}, 404, {
        message: `There are no movie with Id ${idMovie}`,
        error: null
      })
    }
  } catch (err) {
    console.log(err.message)
    return response(res, [], {}, 500, {
      message: 'Internal server error!',
      error: err.message
    })
  }
}

// Delete movie
const controllerDeleteMovie = async (req, res) => {
  const idMovie = req.params.idMovie
  try {
    const checkIdMovie = await modelCheckIdMovie(idMovie)
    if (checkIdMovie.length !== 0) {
      modelDeleteMovie(idMovie)
        .then((result) => {
          setDataRedis()
          return response(res, [], {}, 200, {
            message: `Success delete data movie with id ${idMovie}`,
            error: null
          })
        })
        .catch((err) => {
          console.log(err.message)
          return response(res, [], {}, 500, {
            message: 'Internal server error!',
            error: err.message
          })
        })
    } else {
      return response(res, [], {}, 401, {
        message: `There are no movie with Id ${idMovie}`,
        error: null
      })
    }
  } catch (err) {
    console.log(err.message)
    return response(res, [], {}, 500, {
      message: 'Internal server error!',
      error: err.message
    })
  }
}

module.exports = {
  controllerGetAllMovies,
  controllerGetMovieById,
  controllerInsertMovie,
  controllerUpdateMovie,
  controllerDeleteMovie
}
