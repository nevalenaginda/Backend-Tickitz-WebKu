const {
  modelAddMovie,
  modelGetAllMovies,
  modelUpdateDataMovie,
  modelCheckIdMovie,
  modelDeleteMovie,
  modelGetMovieById,
  modelReadTotalMovies,
} = require("../models/model_movies");

const {
  success,
  createData,
  failed,
  notFound,
  badRequest,
} = require("../helpers/response");

// Read All Ticket
const controllerGetAllMovies = async (req, res) => {
  try {
    // sort && methode (ASC, DESC)
    const sortby = req.query["sort-by"] ? req.query["sort-by"] : "";
    const order = req.query.order ? req.query.order : "desc";
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
          console.log("Oops, data not found Success get data movie");
          success(res, "Success get data movies", pagination, result);
        } else {
          console.log("Oops, data not found");
          notFound(res, "Oops, data not found!", []);
        }
      })
      .catch((error) => {
        console.log(error.message);
        failed(res, "Internal server error!", error.message);
      });
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

// Get ticket by id ticket
const controllerGetMovieById = (req, res) => {
  const idMovie = req.params.idMovie;
  modelGetMovieById(idMovie)
    .then((result) => {
      if (result.length > 0) {
        success(
          res,
          `Success get data movie with id ticket ${idMovie}`,
          {},
          result
        );
      } else {
        notFound(res, "Oops, data not found!", []);
      }
    })
    .catch((error) => {
      console.log(error.message);
      failed(res, "Internal server error!", error.message);
    });
};

// Update ticket
const controllerUpdateMovie = async (req, res) => {
  const idMovie = req.params.idMovie;
  try {
    const checkIdMovie = await modelCheckIdMovie(idMovie);
    if (checkIdMovie.length !== 0) {
      data = req.body;
      data.updated_at = new Date();

      modelUpdateDataMovie(idMovie, data)
        .then((result) => {
          createData(res, "Success Update Movie", data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      badRequest(res, `There are no movie with Id ${idMovie} `, []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

// Delete ticket
const controllerDeleteMovie = async (req, res) => {
  const idMovie = req.params.idMovie;
  try {
    const checkIdMovie = await modelCheckIdMovie(idMovie);
    if (checkIdMovie.length !== 0) {
      modelDeleteMovie(idMovie)
        .then((result) => {
          success(res, `Success delete movie with id: ${idMovie}`, {}, []);
        })
        .catch((error) => {
          console.log(error.message);
          failed(res, "Internal server error!", error.message);
        });
    } else {
      badRequest(res, `There are no movie with Id ${idMovie} `, []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

// Insert Ticket
const controllerInsertMovie = async (req, res) => {
  const {
    image,
    movie_title,
    category,
    duration_movie,
    directed_by,
    casts,
    synopsis,
    release_date,
  } = req.body;

  if (
    !image ||
    !movie_title ||
    !category ||
    !duration_movie ||
    !directed_by ||
    !casts ||
    !synopsis ||
    !release_date
  ) {
    badRequest(res, "Failed to insert movie. All data cannot be empty", []);
  } else {
    const data = {
      image,
      movie_title,
      category,
      duration_movie,
      directed_by,
      casts,
      synopsis,
      release_date,
      created_at: new Date(),
      updated_at: new Date(),
    };

    modelAddMovie(data)
      .then((result) => {
        console.log("Success insert movie");
        createData(res, "Success insert movie", data);
      })
      .catch((error) => {
        console.log(error.message);
        failed(res, "Internal server error!", error.message);
      });
  }
};

module.exports = {
  controllerGetAllMovies,
  controllerGetMovieById,
  controllerInsertMovie,
  controllerUpdateMovie,
  controllerDeleteMovie,
};
