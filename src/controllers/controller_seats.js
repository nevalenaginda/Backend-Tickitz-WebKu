const {
  modelAddSeat,
  modelReadTotalSeats,
  modelGetAllSeats,
  modelGetSeatById,
  modelUpdateDataSeat,
  modelCheckIdSeat,
  modelDeleteSeat,
  modelGetSeatByIdSchedule,
} = require("../models/model_seats");
const { response } = require("../helpers/response");

// create
const controllerAddSeat = async (req, res) => {
  const { id_schedule, id_transaction, id_cinema, seat } = req.body;
  console.log(req.body);

  if (!id_schedule || !id_transaction || !id_cinema || !seat) {
    // res, data, pagination, status, message
    return response(res, [], {}, 401, {
      message: "Failed to  add data seat. All data cannot be empty.",
      error: null,
    });
  } else {
    const data = {
      id_schedule,
      id_transaction,
      id_cinema,
      seat,
      created_at: new Date(),
      updated_at: new Date(),
    };

    modelAddSeat(data)
      .then((result) => {
        console.log("Success insert seat.");
        // res, data, pagination, status, message
        return response(res, [data], {}, 201, {
          message: "Success insert seat.",
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

// Read All Seats
const controllerGetAllSeats = async (req, res) => {
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
    const totalPage = await modelReadTotalSeats(search);

    modelGetAllSeats(data, search, pages)
      .then((result) => {
        if (result.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit),
          };
          console.log("Success get data seat");
          return response(res, result, pagination, 200, {
            message: "Success get data seat",
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

// Read Seat by id seat
const controllerGetSeatById = (req, res) => {
  const idSeat = req.params.idSeat;
  modelGetSeatById(idSeat)
    .then((result) => {
      if (result.length > 0) {
        // res, data, pagination, status, message
        return response(res, result[0], {}, 200, {
          message: `Success get data seat with id ${idSeat}`,
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

//get seat by id schedule
// Read Seat by id seat
const controllerGetSeatBySchedule = (req, res) => {
  const idSchedule = req.params.idSchedule;
  modelGetSeatByIdSchedule(idSchedule)
    .then((result) => {
      if (result.length > 0) {
        // res, data, pagination, status, message
        return response(res, result, {}, 200, {
          message: `Success get data seat`,
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

// Update seat
const controllerUpdateSeat = async (req, res) => {
  const idSeat = req.params.idSeat;
  try {
    const checkIdSeat = await modelCheckIdSeat(idSeat);
    if (checkIdSeat.length !== 0) {
      let data = req.body;
      data.updated_at = new Date();

      modelUpdateDataSeat(idSeat, data)
        .then((result) => {
          return response(res, [data], {}, 200, {
            message: `Succes update data seat with id ${idSeat}`,
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
        message: `There are no seat with Id ${idSeat}`,
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

// Delete seat
const controllerDeleteSeat = async (req, res) => {
  const idSeat = req.params.idSeat;
  try {
    const checkIdSeat = await modelCheckIdSeat(idSeat);
    if (checkIdSeat.length !== 0) {
      modelDeleteSeat(idSeat)
        .then((result) => {
          return response(res, [], {}, 200, {
            message: `Succes delete data seat with id ${idSeat}`,
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
        message: `There are no seat with Id ${idSeat}`,
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
  controllerAddSeat,
  controllerGetAllSeats,
  controllerGetSeatById,
  controllerUpdateSeat,
  controllerDeleteSeat,
  controllerGetSeatBySchedule,
};
