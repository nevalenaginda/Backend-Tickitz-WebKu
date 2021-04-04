const {
  modelAddTransaction,
  modelGetAllTransactions,
  modelGetTransactionById,
  modelDeleteTransaction,
  modelUpdateDataTransaction,
  modelReadTotalTransactions,
  modelCheckIdTransaction,
} = require("../models/model_transactions");

const { response } = require("../helpers/response");

// Create transaction
const controllerAddTransaction = async (req, res) => {
  const {
    id_ticket,
    id_movie,
    id_user,
    id_schedule,
    total_payment,
    payment_methods,
    status_payment,
  } = req.body;

  if (
    !id_ticket ||
    !id_movie ||
    !id_user ||
    !id_schedule ||
    !total_payment ||
    !payment_methods ||
    !status_payment
  ) {
    return response(res, [], {}, 401, {
      message: "Failed to  add data transaction. All data cannot be empty.",
      error: null,
    });
  } else {
    const data = {
      id_ticket,
      id_movie,
      id_user,
      id_schedule,
      total_payment,
      payment_methods,
      status_payment,
      created_at: new Date(),
      updated_at: new Date(),
    };
    modelAddTransaction(data)
      .then((result) => {
        return response(res, [data], {}, 201, {
          message: "Success add transaction.",
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

// Read all transaction
const controllerGetAllTransactions = async (req, res) => {
  try {
    // sort && methode (ASC, DESC)
    const sortby = req.query["sort-by"] ? req.query["sort-by"] : "";
    const order = req.query.order ? req.query.order : "asc";
    const data = sortby ? `ORDER BY ${sortby} ${order}` : "";

    // searcing
    const searchby = req.query["search-by"];
    const item = req.query.item;
    const search =
      item && searchby ? `WHERE ${searchby} LIKE '%${item}%'` : " ";

    // pagination
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 20;
    const start = page === 1 ? 0 : (page - 1) * limit;
    const pages = page ? `LIMIT ${start}, ${limit}` : "";

    // total page
    const totalPage = await modelReadTotalTransactions(search);
    console.log(totalPage);

    modelGetAllTransactions(data, search, pages)
      .then((result) => {
        if (result.length > 0) {
          const pagination = {
            page: page,
            limit: limit,
            total: totalPage[0].total,
            totalPage: Math.ceil(totalPage[0].total / limit),
          };

          return response(res, result, pagination, 200, {
            message: "Success get data transaction",
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

// Read transaction by Id
const controllerGetTransactionById = (req, res) => {
  const idTransaction = req.params.idTransaction;
  modelGetTransactionById(idTransaction)
    .then((result) => {
      if (result.length > 0) {
        return response(res, result, {}, 200, {
          message: `Success get data transaction with id ${idTransaction}`,
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

// Update transaction
const controllerUpdateDataTransaction = async (req, res) => {
  const idTransaction = req.params.idTransaction;
  try {
    const checkIdTransactionidTransaction = await modelCheckIdTransaction(
      idTransaction
    );
    if (checkIdTransactionidTransaction.length !== 0) {
      let data = req.body;
      data.updated_at = new Date();

      modelUpdateDataTransaction(idTransaction, data)
        .then((result) => {
          return response(res, [data], {}, 200, {
            message: `Succes update data transaction with id ${idTransaction}`,
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
        message: `There are no transaction with Id ${idTransaction}`,
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

const controllerDeleteTransaction = async (req, res) => {
  const idTransaction = req.params.idTransaction;
  try {
    const checkIdTransaction = await modelCheckIdTransaction(idTransaction);
    if (checkIdTransaction.length !== 0) {
      modelDeleteTransaction(idTransaction)
        .then((result) => {
          return response(res, [], {}, 200, {
            message: `Success delete data transaction with id ${idTransaction}`,
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
        message: `There are no transaction with Id ${idTransaction}`,
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
  controllerAddTransaction,
  controllerDeleteTransaction,
  controllerGetAllTransactions,
  controllerGetTransactionById,
  controllerUpdateDataTransaction,
};
