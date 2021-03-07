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

const controllerGetTickets = async (req, res) => {
  try {
    // sort && methode (ASC, DESC)
    const sort = req.query.sort ? req.query.sort : ``;
    const methode = req.query.methode ? req.query.methode : "desc";
    const data = sort ? `ORDER BY ${sort} ${methode}` : ``;

    // searcing name
    const order = req.query.order;
    const item = req.query.item;
    const search = item ? `WHERE ${order} LIKE '%${item}%'` : ` `;

    //pagination
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 100;
    const start = page === 1 ? 0 : (page - 1) * limit;
    const pages = page ? `LIMIT ${start}, ${limit}` : ``;

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

          success(res, "Suceess get data user", pagination, result);
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

const controllerGetTicketById = (req, res) => {
  // console.log("id tiket = ", req.params.id);
  const idTicket = req.params.idTicket;
  modelGetTicketById(idTicket)
    .then((result) => {
      if (result.length > 0) {
        success(
          res,
          `Sucess get data ticket with id ticket ${idTicket}`,
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
  try {
    const checkIdTicket = await modelCheckIdTicket(idTicket);
    // console.log(checkIdTicket);
    if (checkIdTicket.length !== 0) {
      if (
        id_film === "" ||
        id_user === "" ||
        price === "" ||
        location === "" ||
        cinema_name === "" ||
        ticket_status === "" ||
        seats === "" ||
        count === "" ||
        date_time === ""
      ) {
        badRequest(
          res,
          "Failed to insert ticket. All data cannot be empty",
          []
        );
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
          updated_at: new Date(),
        };

        modelUpdateTicket(idTicket, data)
          .then((result) => {
            createData(res, "Success Update Ticket", data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      badRequest(res, `There are no ticket with Id ${idTicket} `, []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

const controllerDeleteTicket = async (req, res) => {
  const idTicket = req.params.idTicket;
  try {
    const checkIdTicket = await modelCheckIdTicket(idTicket);
    // console.log(checkIdTicket);
    if (checkIdTicket.length !== 0) {
      modelDeleteTicket(idTicket)
        .then((result) => {
          success(res, `Sucess delete ticket with id: ${idTicket}`, {}, []);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      badRequest(res, `There are no ticket with Id ${idTicket} `, []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

const controllerInsertTicket = async (req, res) => {
  const {
    id_tiket,
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
  // console.log(req.body);

  try {
    const checkIdTicket = await modelCheckIdTicket(id_tiket);
    // console.log(checkIdTicket.length);
    if (checkIdTicket.length === 0) {
      if (
        id_tiket === "" ||
        id_film === "" ||
        id_user === "" ||
        price === "" ||
        location === "" ||
        cinema_name === "" ||
        ticket_status === "" ||
        seats === "" ||
        count === "" ||
        date_time === ""
      ) {
        badRequest(
          res,
          "Failed to insert ticket. All data cannot be empty",
          []
        );
      } else {
        const data = {
          id_tiket,
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
            createData(res, "Success insert ticket", data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      badRequest(res, "Failed to insert ticket. Id ticket has been used", []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

module.exports = {
  controllerGetTickets,
  controllerGetTicketById,
  controllerUpdateTicket,
  controllerInsertTicket,
  controllerDeleteTicket,
};
