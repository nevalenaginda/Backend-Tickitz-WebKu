const {
  modelUpdateTicket,
  modelInsertTicket,
  modelDeleteTicket,
  modelGetTicketById,
  modelGetAllTickets,
  modelReadTotalTickets,
  modelCheckIdTicket,
} = require("../models/model_tickets");

const {
  success,
  createData,
  failed,
  notFound,
  badRequest,
} = require("../helpers/response");

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
          console.log("Oops, data not foundSuccess get data ticket");
          success(res, "Success get data ticket", pagination, result);
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
const controllerGetTicketById = (req, res) => {
  const idTicket = req.params.idTicket;
  modelGetTicketById(idTicket)
    .then((result) => {
      if (result.length > 0) {
        success(
          res,
          `Success get data ticket with id ticket ${idTicket}`,
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
const controllerUpdateTicket = async (req, res) => {
  const idTicket = req.params.idTicket;
  const {
    id_film,
    id_user,
    price,
    location,
    cinema_name,
    ticket_status,
    seats,
    count,
    date_time,
  } = req.body;

  if (
    !id_film ||
    !id_user ||
    !price ||
    !location ||
    !cinema_name ||
    !ticket_status | !seats | !count ||
    !date_time
  ) {
    badRequest(res, "Failed to insert ticket. All data cannot be empty", []);
  } else {
    try {
      const checkIdTicket = await modelCheckIdTicket(idTicket);
      if (checkIdTicket.length !== 0) {
        const data = {
          id_film,
          id_user,
          price,
          location,
          cinema_name,
          ticket_status,
          seats,
          count,
          date_time,
          updated_at: new Date(),
        };

        modelUpdateTicket(idTicket, data)
          .then((result) => {
            createData(res, "Success Update Ticket", data);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        badRequest(res, `There are no ticket with Id ${idTicket} `, []);
      }
    } catch (error) {
      console.log(error.message);
      failed(res, "Internal server error!", error.message);
    }
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
          success(res, `Success delete ticket with id: ${idTicket}`, {}, []);
        })
        .catch((error) => {
          console.log(error.message);
          failed(res, "Internal server error!", error.message);
        });
    } else {
      badRequest(res, `There are no ticket with Id ${idTicket} `, []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

// Insert Ticket
const controllerInsertTicket = async (req, res) => {
  const {
    id_film,
    id_user,
    price,
    location,
    cinema_name,
    ticket_status,
    seats,
    count,
    date_time,
  } = req.body;

  if (
    !id_film ||
    !id_user ||
    !price ||
    !location ||
    !cinema_name ||
    !ticket_status ||
    !seats ||
    !count ||
    !date_time
  ) {
    badRequest(res, "Failed to insert ticket. All data cannot be empty", []);
  } else {
    const data = {
      id_film,
      id_user,
      price,
      location,
      cinema_name,
      ticket_status,
      seats,
      count,
      date_time,
      created_at: new Date(),
      updated_at: new Date(),
    };

    modelInsertTicket(data)
      .then((result) => {
        console.log("Success insert ticket");
        createData(res, "Success insert ticket", data);
      })
      .catch((error) => {
        console.log(error.message);
        failed(res, "Internal server error!", error.message);
      });
  }
};

module.exports = {
  controllerGetTickets,
  controllerGetTicketById,
  controllerUpdateTicket,
  controllerInsertTicket,
  controllerDeleteTicket,
};
