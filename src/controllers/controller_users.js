const {
  modelAddUser,
  modelGetUserById,
  modelGetAllUsers,
  modelDeleteUser,
  modelUpdateDataUser,
  modelReadTotalUsers,
  modelCheckEmail,
  modelCheckIdUser,
} = require("../models/model_users");

const {
  success,
  createData,
  failed,
  notFound,
  badRequest,
} = require("../helpers/response");

//controller add user
const controllerAddUser = async (req, res) => {
  const {
    id_user,
    full_name,
    gender,
    email,
    password,
    phone_number,
  } = req.body;
  try {
    checkEmail = await modelCheckEmail(email);
    console.log("email", checkEmail.length);
    checkIdUser = await modelCheckIdUser(id_user);
    console.log("id", checkIdUser.length);
    if (checkEmail.length === 0 && checkIdUser.length === 0) {
      if (
        id_user === "" ||
        full_name === "" ||
        gender === "" ||
        email === "" ||
        password === "" ||
        phone_number === ""
      ) {
        badRequest(res, "Failed to register. All data cannot be empty", []);
      } else {
        const data = {
          id_user,
          full_name,
          gender,
          email,
          password,
          phone_number,
          created_at: new Date(),
          updated_at: new Date(),
        };
        modelAddUser(data)
          .then((result) => {
            createData(res, "Registration Success", data);
          })
          .catch((err) => {
            console.log(err.message);
            failed(res, "Internal server error!", err.message);
          });
      }
    } else {
      badRequest(res, "Failed to register. Email or id has been used", []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

//Get all users
const controllerGetAllUsers = async (req, res) => {
  try {
    // searcing name
    const name = req.query.name;
    const search = name ? `WHERE full_name LIKE '%${name}%'` : ` `;

    // order && metode (ASC, DESC)
    const order = req.query.order ? req.query.order : ``;
    const methode = req.query.methode ? req.query.methode : "asc";
    const data = order ? `ORDER BY ${order} ${methode}` : ``;

    //pagination
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 100;
    const start = page === 1 ? 0 : (page - 1) * limit;
    const pages = page ? `LIMIT ${start}, ${limit}` : ``;

    // total page
    const totalPage = await modelReadTotalUsers(search);

    modelGetAllUsers(search, data, pages)
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
      .catch((err) => {
        console.log(err.message);
        failed(res, "Internal server error!", err.message);
      });
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

const controllerGetUserById = (req, res) => {
  const UserId = req.params.userId;
  modelGetUserById(UserId)
    .then((result) => {
      if (result.length > 0) {
        success(res, `Sucess get data user ${UserId}`, {}, result);
      } else {
        notFound(res, "Oops, data not found!", []);
      }
    })
    .catch((err) => {
      console.log(err.message);
      failed(res, "Internal server error!", error.message);
    });
};

const controllerUpdateDataUser = async (req, res) => {
  const userId = req.params.userId;
  const { full_name, gender, email, password, phone_number } = req.body;

  try {
    checkIdUser = await modelCheckIdUser(userId);

    if (checkIdUser.length !== 0) {
      const data = {
        full_name,
        gender,
        email,
        password,
        phone_number,
        updated_at: new Date(),
      };
      modelUpdateDataUser(userId, data)
        .then((result) => {
          success(res, `Sucess update data user with id ${userId}`, {}, data);
        })
        .catch((error) => {
          console.log(error.message);
          failed(res, "Internal server error!", error.message);
        });
    } else {
      badRequest(res, `There are no user with Id ${userId} `, []);
    }
  } catch (error) {
    console.log(error.message);
    failed(res, "Internal server error!", error.message);
  }
};

const controllerDeleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    checkIdUser = await modelCheckIdUser(userId);
    if (checkIdUser.length !== 0) {
      modelDeleteUser(userId)
        .then((result) => {
          success(res, `Sucess delete user with id: ${userId}`, {}, []);
        })
        .catch((error) => {
          console.log(error.mesage);
          failed(res, "Internal server error!", error.message);
        });
    } else {
      badRequest(res, `There are no user with Id ${userId} `, []);
    }
  } catch (error) {
    failed(res, "Internal server error!", error.message);
  }
};

module.exports = {
  controllerGetUserById,
  controllerAddUser,
  controllerGetAllUsers,
  controllerUpdateDataUser,
  controllerDeleteUser,
};
