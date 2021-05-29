const {
  modelUpdateTicket,
  modelInsertTicket,
  modelDeleteTicket,
  modelGetTicketById,
  modelGetAllTickets,
  modelReadTotalTickets,
  modelCheckIdTicket,
  modelGetDetailTickets,
  modelGetAllDetailTickets,
} = require("../models/model_tickets");

const { response } = require("../helpers/response");

// Insert Ticket
const controllerInsertTicket = async (req, res) => {
  const { id_schedule, id_user, id_transaction, ordered_seat, ticket_status } =
    req.body;

  if (
    !id_schedule ||
    !id_user ||
    !id_transaction ||
    !ordered_seat ||
    !ticket_status
  ) {
    return response(res, [], {}, 401, {
      message: "Failed to  add data ticket. All data cannot be empty.",
      error: null,
    });
  } else {
    const data = {
      id_schedule,
      id_user,
      id_transaction,
      ordered_seat,
      ticket_status,
      created_at: new Date(),
      updated_at: new Date(),
    };

    modelInsertTicket(data)
      .then((result) => {
        console.log("Success insert ticket");
        return response(res, result, {}, 201, {
          message: "Success insert ticket.",
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

// Read All Ticket
const controllerGetTickets = async (req, res) => {
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
    const totalPage = await modelReadTotalTickets(search);

    modelGetAllTickets(data, search, pages)
      .then((result) => {
        if (result.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit),
          };
          console.log("Success get data ticket");
          return response(res, result, pagination, 200, {
            message: "Success get data ticket",
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

// Get ticket by id
const controllerGetTicketById = (req, res) => {
  const idTicket = req.params.idTicket;
  modelGetTicketById(idTicket)
    .then((result) => {
      if (result.length > 0) {
        return response(res, result, {}, 200, {
          message: `Success get data ticket with id ${idTicket}`,
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

// Get ticket by id
const controllerGetDetailTicketById = (req, res) => {
  const idTicket = req.params.idTicket;
  modelGetDetailTickets(idTicket)
    .then((result) => {
      if (result.length > 0) {
        return response(res, result[0], {}, 200, {
          message: `Success get one data ticket`,
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

// Get ticket by id
const controllerGetAllDetailTicketById = (req, res) => {
  const idUser = req.params.idUser;
  console.log(idUser);
  modelGetAllDetailTickets(idUser)
    .then((result) => {
      if (result.length > 0) {
        return response(res, result, {}, 200, {
          message: `Success get data ticket`,
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

// Update ticket
const controllerUpdateTicket = async (req, res) => {
  const idTicket = req.params.idTicket;
  try {
    const checkIdTicket = await modelCheckIdTicket(idTicket);
    if (checkIdTicket.length !== 0) {
      let data = req.body;
      data.updated_at = new Date();

      modelUpdateTicket(idTicket, data)
        .then((result) => {
          return response(res, [data], {}, 200, {
            message: `Succes update data ticket with id ${idTicket}`,
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
        message: `There are no ticket with Id ${idTicket}`,
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

// Delete ticket
const controllerDeleteTicket = async (req, res) => {
  const idTicket = req.params.idTicket;
  try {
    const checkIdTicket = await modelCheckIdTicket(idTicket);
    if (checkIdTicket.length !== 0) {
      modelDeleteTicket(idTicket)
        .then((result) => {
          return response(res, [], {}, 200, {
            message: `Success delete data ticket with id ${idTicket}`,
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
      return response(res, [], {}, 401, {
        message: `There are no ticket with Id ${idTicket}`,
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
  controllerGetTickets,
  controllerGetTicketById,
  controllerUpdateTicket,
  controllerInsertTicket,
  controllerDeleteTicket,
  controllerGetAllDetailTicketById,
  controllerGetDetailTicketById,
};
