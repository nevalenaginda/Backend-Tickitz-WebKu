const {
  modelAddMovie,
  modelGetAllMovies,
  modelUpdateDataMovie,
  modelCheckIdMovie,
  modelDeleteMovie,
  modelGetMovieById,
  modelReadTotalMovies,
  modelGetAllMoviesRedis,
} = require("../models/model_movies");
const { envURLImage } = require("../helpers/env");
const { response } = require("../helpers/response");

const redisClient = require("../configs/redis");
// filesystem
const fs = require("fs");
const { map } = require("lodash");

const setDataRedis = () => {
  modelGetAllMoviesRedis()
    .then((response) => {
      const data = JSON.stringify(response);
      redisClient.set("dataAllMovies", data);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

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
    release_date,
  } = req.body;

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
      message: "Failed to  add data movie. All data cannot be empty.",
      error: null,
    });
  } else {
    const image = req.file ? `${req.file.filename}` : `default_poster.jpg`;
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
      updated_at: new Date(),
    };

    modelAddMovie(data)
      .then((result) => {
        setDataRedis();
        data.image = `${envURLImage}/${data.image}`;
        return response(res, [data], {}, 201, {
          message: "Success insert movie.",
          error: null,
        });
      })
      .catch((err) => {
        console.log(err.message);
        return response(res, [], {}, 500, {
          message: "Internal server error",
          error: err.message,
        });
      });
  }
};

// Read All
const controllerGetAllMovies = async (req, res) => {
  try {
    // sort && methode (ASC, DESC)
    const sortby = req.query["sort-by"] ? req.query["sort-by"] : "";
    const order = req.query.order ? req.query.order : "ASC";
    const data = sortby ? `ORDER BY ${sortby} ${order}` : "";

    // searcing name
    const searchby = req.query["search-by"];
    const item = req.query.item;
    const search = item ? `WHERE ${searchby} LIKE '%${item}%'` : " ";

    // pagination
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 20;
    const start = page === 1 ? 0 : (page - 1) * limit;
    const pages = page ? `LIMIT ${start}, ${limit}` : "";

    // total page
    const totalPage = await modelReadTotalMovies(search);

    modelGetAllMovies(data, search, pages)
      .then((result) => {
        if (result.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit),
          };
          setDataRedis();
          result.map((item, index) => {
            result[index].image = `${envURLImage}/${item.image}`;
          });
          return response(res, result, pagination, 200, {
            message: "Success get data movie from server",
            error: null,
          });
        } else {
          return response(res, [], {}, 404, {
            message: "Oops, data not found",
            error: null,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        return response(res, [], {}, 500, {
          message: "Internal server error",
          error: err.message,
        });
      });
  } catch (err) {
    console.log(err.message);
    return response(res, [], {}, 500, {
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Read All upcoming
const controllerGetUpcoming = async (req, res) => {
  try {
    // sort && methode (ASC, DESC)
    const sortby = req.query["sort-by"] ? req.query["sort-by"] : "";
    const order = req.query.order ? req.query.order : "desc";
    const data = sortby ? `ORDER BY ${sortby} ${order}` : "";

    // searcing name
    const searchby = req.query["search-by"];
    const item = req.query.item;
    const key = "WHERE release_date > CURRENT_DATE() ";
    const search = item ? ` AND   ${searchby} LIKE '%${item}%'` : " ";

    // pagination
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 5;
    const start = page === 1 ? 0 : (page - 1) * limit;
    const pages = page ? `LIMIT ${start}, ${limit}` : "";

    // total page
    const totalPage = await modelReadTotalMovies(key + search);

    modelGetAllMovies(key + search, data, pages)
      .then((result) => {
        if (result.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit),
          };
          setDataRedis();
          result.map((item, index) => {
            result[index].image = `${envURLImage}/${item.image}`;
          });
          return response(res, result, pagination, 200, {
            message: "Success get data movie from server",
            error: null,
          });
        } else {
          return response(res, [], {}, 404, {
            message: "Oops, data not found",
            error: null,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        return response(res, [], {}, 500, {
          message: "Internal server error",
          error: err.message,
        });
      });
  } catch (err) {
    console.log(err.message);
    return response(res, [], {}, 500, {
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Read All now showing
const controllerGetNowShowing = async (req, res) => {
  try {
    // sort && methode (ASC, DESC)
    const sortby = req.query["sort-by"] ? req.query["sort-by"] : "";
    const order = req.query.order ? req.query.order : "desc";
    const data = sortby ? ` ORDER BY ${sortby} ${order} ` : "";

    // searcing name
    const searchby = req.query["search-by"];
    const item = req.query.item;
    const key = "WHERE release_date <= CURRENT_DATE()";
    const search = item ? ` AND   ${searchby} LIKE '%${item}%'` : " ";

    // pagination
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 5;
    const start = page === 1 ? 0 : (page - 1) * limit;
    const pages = page ? `LIMIT ${start}, ${limit}` : "";

    // total page
    const totalPage = await modelReadTotalMovies(key + search);

    modelGetAllMovies(key + search, data, pages)
      .then((result) => {
        if (result.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit),
          };
          setDataRedis();
          result.map((item, index) => {
            result[index].image = `${envURLImage}/${item.image}`;
          });
          return response(res, result, pagination, 200, {
            message: "Success get data movie from server",
            error: null,
          });
        } else {
          return response(res, [], {}, 404, {
            message: "Oops, data not found",
            error: null,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
        return response(res, [], {}, 500, {
          message: "Internal server error",
          error: err.message,
        });
      });
  } catch (err) {
    console.log(err.message);
    return response(res, [], {}, 500, {
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Read Movie by id
const controllerGetMovieById = (req, res) => {
  const idMovie = req.params.idMovie;
  modelGetMovieById(idMovie)
    .then((result) => {
      if (result.length > 0) {
        result[0].image = `${envURLImage}/${result[0].image}`;
        return response(res, result, {}, 200, {
          message: `Success get data movie with id ${idMovie}`,
          error: null,
        });
      } else {
        return response(res, [], {}, 404, {
          message: "Oops, data not found!",
          error: null,
        });
      }
    })
    .catch((err) => {
      console.log(err.message);
      return response(res, [], {}, 500, {
        message: "Internal server error!",
        error: err.message,
      });
    });
};

// Update movie
const controllerUpdateMovie = async (req, res) => {
  const idMovie = req.params.idMovie;
  try {
    const checkIdMovie = await modelCheckIdMovie(idMovie);
    if (checkIdMovie.length !== 0) {
      let data = req.body;
      data.updated_at = new Date();
      const last_image = await modelGetMovieById(idMovie);

      if (req.file) {
        data.image = `${req.file.filename}`;
        // let delImage = last_image[0].image.split("/").slice(-1)[0];
        if (last_image[0].image !== "default_poster.jpg") {
          const locationPath = "./src/uploads/" + last_image[0].image;
          fs.unlinkSync(locationPath);
          modelUpdateDataMovie(idMovie, data)
            .then((result) => {
              setDataRedis();
              data.image = `${envURLImage}/${data.image}`;
              return response(res, [data], {}, 200, {
                message: `Succes update data movie with id ${idMovie}`,
                error: null,
              });
            })
            .catch((err) => {
              console.log(err.message);
              return response(res, [], {}, 500, {
                message: "Internal server error!",
                error: err.message,
              });
            });
        } else {
          modelUpdateDataMovie(idMovie, data)
            .then((result) => {
              setDataRedis();
              data.image = `${envURLImage}/${data.image}`;
              return response(res, [data], {}, 200, {
                message: `Succes update data movie with id ${idMovie}`,
                error: null,
              });
            })
            .catch((err) => {
              console.log(err.message);
              return response(res, [], {}, 500, {
                message: "Internal server error!",
                error: err.message,
              });
            });
        }
      } else {
        modelUpdateDataMovie(idMovie, data)
          .then((result) => {
            setDataRedis();
            data.image = `${envURLImage}/${data.image}`;
            return response(res, [data], {}, 200, {
              message: `Succes update data movie with id ${idMovie}`,
              error: null,
            });
          })
          .catch((err) => {
            console.log(err.message);
            return response(res, [], {}, 500, {
              message: "Internal server error!",
              error: err.message,
            });
          });
      }
    } else {
      return response(res, [], {}, 404, {
        message: `There are no movie with Id ${idMovie}`,
        error: null,
      });
    }
  } catch (err) {
    console.log(err.message);
    return response(res, [], {}, 500, {
      message: "Internal server error!",
      error: err.message,
    });
  }
};

// Delete movie
const controllerDeleteMovie = async (req, res) => {
  const idMovie = req.params.idMovie;
  try {
    const checkIdMovie = await modelCheckIdMovie(idMovie);
    if (checkIdMovie.length !== 0) {
      const last_image = await modelGetMovieById(idMovie);
      let delImage = last_image[0].image.split("/").slice(-1)[0];
      if (delImage !== "default_poster.jpg") {
        const locationPath = "./src/uploads/" + delImage;
        fs.unlinkSync(locationPath);
        modelDeleteMovie(idMovie)
          .then((result) => {
            setDataRedis();
            return response(res, [], {}, 200, {
              message: `Success delete data movie with id ${idMovie}`,
              error: null,
            });
          })
          .catch((err) => {
            console.log(err.message);
            return response(res, [], {}, 500, {
              message: "Internal server error!",
              error: err.message,
            });
          });
      } else {
        modelDeleteMovie(idMovie)
          .then((result) => {
            setDataRedis();
            return response(res, [], {}, 200, {
              message: `Success delete data movie with id ${idMovie}`,
              error: null,
            });
          })
          .catch((err) => {
            console.log(err.message);
            return response(res, [], {}, 500, {
              message: "Internal server error!",
              error: err.message,
            });
          });
      }
    } else {
      return response(res, [], {}, 401, {
        message: `There are no movie with Id ${idMovie}`,
        error: null,
      });
    }
  } catch (err) {
    console.log(err.message);
    return response(res, [], {}, 500, {
      message: "Internal server error!",
      error: err.message,
    });
  }
};

module.exports = {
  controllerGetAllMovies,
  controllerGetMovieById,
  controllerInsertMovie,
  controllerUpdateMovie,
  controllerDeleteMovie,
  controllerGetUpcoming,
  controllerGetNowShowing,
};
