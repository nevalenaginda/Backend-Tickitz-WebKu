const {
  modelAddCinema,
  modelReadTotalCinemas,
  modelGetAllCinemas,
  modelGetCinemaById,
  modelUpdateDataCinema,
  modelCheckIdCinema,
  modelDeleteCinema,
} = require("../models/model_cinemas");
const { response } = require("../helpers/response");
const { envPORT } = require("../helpers/env");

// Insert Movie
const controllerAddCinema = async (req, res) => {
  const { cinema_name, address_cinema, city_cinema } = req.body;
  console.log(req.body);

  if (!cinema_name || !address_cinema || !city_cinema) {
    // res, data, pagination, status, message
    return response(res, [], {}, 401, {
      message: "Failed to  add data cinema. All data cannot be empty.",
      error: null,
    });
  } else {
    const logo_cinema = req.file
      ? `http://localhost:${envPORT}/img/${req.file.filename}`
      : `http://localhost:${envPORT}/img/default_cinema.png`;
    const data = {
      cinema_name,
      address_cinema,
      city_cinema,
      logo_cinema,
      created_at: new Date(),
      updated_at: new Date(),
    };

    modelAddCinema(data)
      .then((result) => {
        console.log("Success add cinema.");
        // res, data, pagination, status, message
        return response(res, [data], {}, 201, {
          message: "Success add cinema.",
          error: null,
        });
      })
      .catch((err) => {
        console.log(err.message);
        // res, data, pagination, status, message
        return response(res, [], {}, 500, {
          message: "Internal server error",
          error: err.message,
        });
      });
  }
};

// Read All Cinemas
const controllerGetAllCinemas = async (req, res) => {
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
    const totalPage = await modelReadTotalCinemas(search);

    modelGetAllCinemas(data, search, pages)
      .then((result) => {
        if (result.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit),
          };
          console.log("Success get data cinemas");
          return response(res, result, pagination, 200, {
            message: "Success get data cinemas",
            error: null,
          });
        } else {
          console.log("Oops, data not found");
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

// Get Cinema by id ticket
const controllerGetCinemaById = (req, res) => {
  const idCinema = req.params.idCinema;
  modelGetCinemaById(idCinema)
    .then((result) => {
      if (result.length > 0) {
        // res, data, pagination, status, message
        return response(res, result, {}, 200, {
          message: `Success get data cinema with id ${idCinema}`,
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
const controllerUpdateCinema = async (req, res) => {
  const idCinema = req.params.idCinema;
  try {
    const checkIdCinema = await modelCheckIdCinema(idCinema);
    if (checkIdCinema.length !== 0) {
      let data = req.body;
      data.updated_at = new Date();
      const last_logo = await modelGetCinemaById(idCinema);
      data.logo_cinema = req.file
        ? `http://localhost:${envPORT}/img/${req.file.filename}`
        : last_logo[0].logo_cinema;

      modelUpdateDataCinema(idCinema, data)
        .then((result) => {
          return response(res, [data], {}, 200, {
            message: `Succes update data cinema with id ${idCinema}`,
            error: null,
          });
        })
        .catch((err) => {
          console.log(err);
          return response(res, [], {}, 500, {
            message: "Internal server error!",
            error: err.message,
          });
        });
    } else {
      return response(res, [], {}, 404, {
        message: `There are no cinema with Id ${idCinema}`,
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

// Delete cinema
const controllerDeleteCinema = async (req, res) => {
  const idCinema = req.params.idCinema;
  try {
    const checkIdCinema = await modelCheckIdCinema(idCinema);
    if (checkIdCinema.length !== 0) {
      modelDeleteCinema(idCinema)
        .then((result) => {
          return response(res, [], {}, 200, {
            message: `Succes delete data cinema with id ${idCinema}`,
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
      return response(res, [], {}, 404, {
        message: `There are no cinema with Id ${idCinema}`,
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
  controllerAddCinema,
  controllerGetAllCinemas,
  controllerGetCinemaById,
  controllerUpdateCinema,
  controllerDeleteCinema,
};
