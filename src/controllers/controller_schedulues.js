const {
  modelAddSchedule,
  modelCheckIdSchedule,
  modelDeleteSchedule,
  modelGetAllSchedules,
  modelGetScheduleById,
  modelReadTotalSchedule,
  modelUpdateDataSchedule,
} = require("../models/model_schedules");

const {
  success,
  createData,
  failed,
  notFound,
  badRequest,
} = require("../helpers/response");

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
          console.log("Oops, data not found Success get data schedule");
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

// Get schedule by id schedule
const controllerGetSceheduleById = (req, res) => {
  const idSchedule = req.params.idSchedule;
  modelGetScheduleById(idSchedule)
    .then((result) => {
      if (result.length > 0) {
        success(
          res,
          `Success get data schedule with id schedule ${idSchedule}`,
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

// Update schedule
const controllerUpdateSchedule = async (req, res) => {
  const idSchedule = req.params.idSchedule;
  try {
    const checkIdSchedule = await modelCheckIdSchedule(idSchedule);
    if (checkIdSchedule.length !== 0) {
      data = req.body;
      data.updated_at = new Date();

      modelUpdateDataSchedule(idSchedule, data)
        .then((result) => {
          createData(res, "Success Update schedule", data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      badRequest(res, `There are no schedule with Id ${idSchedule} `, []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

// Delete schedule
const controllerDeleteSchedule = async (req, res) => {
  const idSchedule = req.params.idSchedule;
  try {
    const checkIdSchedule = await modelCheckIdSchedule(idSchedule);
    if (checkIdSchedule.length !== 0) {
      modelDeleteSchedule(idSchedule)
        .then((result) => {
          success(
            res,
            `Success delete schedule with id: ${idSchedule}`,
            {},
            []
          );
        })
        .catch((error) => {
          console.log(error.message);
          failed(res, "Internal server error!", error.message);
        });
    } else {
      badRequest(res, `There are no schedule with Id ${idSchedule} `, []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

// Insert schedule
const controllerInsertSchedule = async (req, res) => {
  const { location, place, time } = req.body;

  if (!location || !place || !time) {
    badRequest(res, "Failed to insert schedule. All data cannot be empty", []);
  } else {
    const data = {
      location,
      place,
      time,
      date: new Date(),
      updated_at: new Date(),
    };

    modelAddSchedule(data)
      .then((result) => {
        console.log("Success insert schedule");
        createData(res, "Success insert schedule", data);
      })
      .catch((error) => {
        console.log(error.message);
        failed(res, "Internal server error!", error.message);
      });
  }
};

module.exports = {
  controllerDeleteSchedule,
  controllerGetAllSchedules,
  controllerGetSceheduleById,
  controllerInsertSchedule,
  controllerUpdateSchedule,
};
