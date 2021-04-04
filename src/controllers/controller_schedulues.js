const {
  modelAddSchedule,
  modelCheckIdSchedule,
  modelDeleteSchedule,
  modelGetAllSchedules,
  modelGetScheduleById,
  modelReadTotalSchedule,
  modelUpdateDataSchedule,
  modelGetAllDetailSchedules,
  modelReadTotalDetailSchedules,
} = require("../models/model_schedules");

const { response } = require("../helpers/response");
const redis = require("redis");
const client = redis.createClient(6379);

// create
const controllerInsertSchedule = async (req, res) => {
  const { id_movie, id_cinema, playing_time, playing_date, price } = req.body;

  if (!id_movie || !id_cinema || !playing_time || !playing_date || !price) {
    return response(res, [], {}, 401, {
      message: "Failed to  add data schedule. All data cannot be empty.",
      error: null,
    });
  } else {
    const data = {
      id_movie,
      id_cinema,
      playing_time,
      playing_date,
      price,
      created_at: new Date(),
      updated_at: new Date(),
    };

    modelAddSchedule(data)
      .then((result) => {
        console.log("Success insert schedule");
        return response(res, [data], {}, 201, {
          message: "Success insert seat.",
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

// Read All schedule
const controllerGetAllSchedules = async (req, res) => {
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
    const totalPage = await modelReadTotalSchedule(search);

    modelGetAllSchedules(data, search, pages)
      .then((result) => {
        if (result.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit),
          };
          console.log("Success get data schedule");
          return response(res, result, pagination, 200, {
            message: "Success get data schedule",
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

// Read schedule by id schedule
const controllerGetSceheduleById = (req, res) => {
  const idSchedule = req.params.idSchedule;
  modelGetScheduleById(idSchedule)
    .then((result) => {
      if (result.length > 0) {
        return response(res, result, {}, 200, {
          message: `Success get data schedule with id ${idSchedule}`,
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

// Update schedule
const controllerUpdateSchedule = async (req, res) => {
  const idSchedule = req.params.idSchedule;
  try {
    const checkIdSchedule = await modelCheckIdSchedule(idSchedule);
    if (checkIdSchedule.length !== 0) {
      let data = req.body;
      data.updated_at = new Date();

      modelUpdateDataSchedule(idSchedule, data)
        .then((result) => {
          return response(res, [data], {}, 200, {
            message: `Succes update data schedule with id ${idSchedule}`,
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
        message: `There are no schedule with Id ${idSchedule}`,
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

// Delete
const controllerDeleteSchedule = async (req, res) => {
  const idSchedule = req.params.idSchedule;
  try {
    const checkIdSchedule = await modelCheckIdSchedule(idSchedule);
    if (checkIdSchedule.length !== 0) {
      modelDeleteSchedule(idSchedule)
        .then((result) => {
          return response(res, [], {}, 200, {
            message: `Succes delete data schedule with id ${idSchedule}`,
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
        message: `There are no schedule with Id ${idSchedule}`,
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

const controllerGetAllDetailSchedules = async (req, res) => {
  // pagination
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 20;
  const start = page === 1 ? 0 : (page - 1) * limit;
  const pages = page ? `LIMIT ${start}, ${limit}` : "";

  //filter
  const city = req.query.city;
  const date = req.query.date;
  const movie = req.query.movie;
  let search = "";
  if (city && date && movie) {
    search = `WHERE tb_cinemas.city_cinema = '${city}' AND tb_schedule_movies.playing_date = '${date}' AND tb_movies.movie_title  LIKE '%${movie}%'`;
  } else if (city && date) {
    search = `WHERE tb_cinemas.city_cinema = '${city}' AND tb_schedule_movies.playing_date = '${date}'`;
  } else if (city && movie) {
    search = `WHERE tb_cinemas.city_cinema = '${city}' AND tb_movies.movie_title  LIKE '%${movie}%'`;
  } else if (date && movie) {
    search = `WHERE tb_schedule_movies.playing_date = '${date}' AND tb_movies.movie_title  LIKE '%${movie}%'`;
  } else if (city) {
    search = `WHERE tb_cinemas.city_cinema = '${city}'`;
  } else if (date) {
    search = `WHERE tb_schedule_movies.playing_date = '${date}'`;
  } else if (movie) {
    search = `WHERE tb_movies.movie_title  LIKE '%${movie}%'`;
  } else {
    search = ``;
  }

  // sort && methode (ASC, DESC)
  const sortby = req.query["sort-by"] ? req.query["sort-by"] : "";
  const order = req.query.order ? req.query.order : "desc";
  const data = sortby ? `ORDER BY ${sortby} ${order}` : "";

  // total page
  const totalPage = await modelReadTotalDetailSchedules(search);

  modelGetAllDetailSchedules(search, data, pages)
    .then((result) => {
      if (result.length > 0) {
        const pagination = {
          page: page,
          limit: limit,
          total: totalPage[0].total,
          totalPage: Math.ceil(totalPage[0].total / limit),
        };
        console.log("Success get data schedule");
        return response(res, result, pagination, 200, {
          message: "Success get data schedule",
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
      return response(res, [], {}, 500, {
        message: "Internal server error!",
        error: err.message,
      });
    });
};

const controllerNowShowing = async (req, res) => {
  // pagination
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 5;
  const start = page === 1 ? 0 : (page - 1) * limit;
  const pages = page ? `LIMIT ${start}, ${limit}` : "";

  //filter
  const search = `WHERE tb_schedule_movies.playing_date = CURRENT_DATE()`;
  const order = "";

  // total page
  const totalPage = await modelReadTotalDetailSchedules(search);

  modelGetAllDetailSchedules(search, order, pages)
    .then((result) => {
      if (result.length > 0) {
        const pagination = {
          page: page,
          limit: limit,
          total: totalPage[0].total,
          totalPage: Math.ceil(totalPage[0].total / limit),
        };
        // console.log(JSON.stringify({ pagination, result }));
        client.setex(
          "getNowShowing",
          60 * 60 * 12,
          JSON.stringify({ pagination, result })
        );
        console.log("Success get data schedule");
        return response(res, result, pagination, 200, {
          message: "Success get data schedule",
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
      return response(res, [], {}, 500, {
        message: "Internal server error!",
        error: err.message,
      });
    });
};

const controllerUpComing = async (req, res) => {
  // pagination
  const page = req.query.page ? req.query.page : 1;
  const limit = req.query.limit ? req.query.limit : 5;
  const start = page === 1 ? 0 : (page - 1) * limit;
  const pages = page ? `LIMIT ${start}, ${limit}` : "";

  //filter
  const search = `WHERE tb_schedule_movies.playing_date > CURRENT_DATE()`;
  const order = "";

  // total page
  const totalPage = await modelReadTotalDetailSchedules(search);

  modelGetAllDetailSchedules(search, order, pages)
    .then((result) => {
      if (result.length > 0) {
        const pagination = {
          page: page,
          limit: limit,
          total: totalPage[0].total,
          totalPage: Math.ceil(totalPage[0].total / limit),
        };
        client.setex(
          "getUpComing",
          60 * 60 * 12,
          JSON.stringify({ pagination, result })
        );
        console.log("Success get data schedule");
        return response(res, result, pagination, 200, {
          message: "Success get data schedule",
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
      return response(res, [], {}, 500, {
        message: "Internal server error!",
        error: err.message,
      });
    });
};

module.exports = {
  controllerDeleteSchedule,
  controllerGetAllSchedules,
  controllerGetSceheduleById,
  controllerInsertSchedule,
  controllerUpdateSchedule,
  controllerGetAllDetailSchedules,
  controllerNowShowing,
  controllerUpComing,
};
