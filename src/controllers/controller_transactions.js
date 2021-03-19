const {
  modelAddTransaction,
  modelGetAllTransactions,
  modelGetTransactionById,
  modelDeleteTransaction,
  modelUpdateDataTransaction,
  modelReadTotalTransactions,
  modelCheckIdTransaction,
} = require("../models/model_transactions");

const {
  success,
  createData,
  failed,
  notFound,
  badRequest,
} = require("../helpers/response");

// Create transaction
const controllerAddTransaction = async (req, res) => {
  const {
    id_ticket,
    id_movie,
    id_user,
    total_payment,
    payment_methods,
    status_payment,
  } = req.body;

  if (
    !id_ticket ||
    !id_movie ||
    !id_user ||
    !total_payment ||
    !payment_methods ||
    !status_payment
  ) {
    badRequest(res, "Failed to add transactions. All data cannot be empty", []);
  } else {
    const data = {
      id_ticket,
      id_movie,
      id_user,
      total_payment,
      payment_methods,
      status_payment,
      created_at: new Date(),
      updated_at: new Date(),
    };
    modelAddTransaction(data)
      .then((result) => {
        createData(res, "Success add data transactions", data);
      })
      .catch((error) => {
        console.log(error.message);
        failed(res, "Internal server error!", error.message);
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

// Read transaction by Id
const controllerGetTransactionById = (req, res) => {
  const idTransaction = req.params.idTransaction;
  modelGetTransactionById(idTransaction)
    .then((result) => {
      if (result.length > 0) {
        success(
          res,
          `Sucess get data transaction with id transactions${idTransaction}`,
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

const controllerUpdateDataTransaction = async (req, res) => {
  const idTransaction = req.params.idTransaction;
  const {
    id_ticket,
    id_movie,
    id_user,
    total_payment,
    payment_methods,
    status_payment,
  } = req.body;

  if (
    !id_ticket ||
    !id_movie ||
    !id_user ||
    !total_payment ||
    !payment_methods ||
    !status_payment
  ) {
    badRequest(res, "Failed to insert ticket. All data cannot be empty", []);
  } else {
    try {
      const checkIdTransaction = await modelCheckIdTransaction(idTransaction);
      if (checkIdTransaction.length !== 0) {
        const data = {
          id_ticket,
          id_movie,
          id_user,
          total_payment,
          payment_methods,
          status_payment,
          updated_at: new Date(),
        };

        modelUpdateDataTransaction(idTransaction, data)
          .then((result) => {
            createData(res, "Success update data transaction", data);
          })
          .catch((error) => {
            console.log(error.message);
            failed(res, "Internal server error!", error.message);
          });
      } else {
        badRequest(
          res,
          `There are no transaction with Id ${idTransaction} `,
          []
        );
      }
    } catch (error) {
      console.log(error.message);
      failed(res, "Internal server error!", error.message);
    }
  }
};

const controllerDeleteTransaction = async (req, res) => {
  const idTransaction = req.params.idTransaction;
  try {
    const checkIdTransaction = await modelCheckIdTransaction(idTransaction);
    // console.log(checkIdTicket);
    if (checkIdTransaction.length !== 0) {
      modelDeleteTransaction(idTransaction)
        .then((result) => {
          success(
            res,
            `Sucess delete transaction with id: ${idTransaction}`,
            {},
            []
          );
        })
        .catch((error) => {
          console.log(error.message);
          failed(res, "Internal server error!", error.message);
        });
    } else {
      badRequest(res, `There are no transaction with Id ${idTransaction} `, []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

module.exports = {
  controllerAddTransaction,
  controllerDeleteTransaction,
  controllerGetAllTransactions,
  controllerGetTransactionById,
  controllerUpdateDataTransaction,
};
