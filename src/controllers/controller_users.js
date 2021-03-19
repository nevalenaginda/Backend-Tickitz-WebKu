const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { envJWT } = require("../helpers/env");
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

//Add user
const controllerAddUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    badRequest(
      res,
      "Failed to register. Email and password cannot be empty",
      []
    );
  } else {
    try {
      const checkEmail = await modelCheckEmail(email.toLowerCase());
      console.log(checkEmail);

      if (checkEmail.length === 0) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
        const data = {
          email: email.toLowerCase(),
          password,
          created_at: new Date(),
          updated_at: new Date(),
        };
        modelAddUser(data)
          .then((result) => {
            createData(res, "Registration Success", data.email);
          })
          .catch((err) => {
            console.log(err.message);
            failed(res, "Internal server error!", err.message);
          });
      } else {
        badRequest(res, "Failed to register. Email has been used", []);
      }
    } catch (error) {
      console.log(error.message);
      failed(res, "Internal server error!", error.message);
    }
  }
};

//Add user
const controllerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    badRequest(
      res,
      "Failed to register. Email and password cannot be empty",
      []
    );
  } else {
    try {
      const checkEmail = await modelCheckEmail(email.toLowerCase());
      console.log(checkEmail);
      if (checkEmail.length === 1) {
        const checkPass = await bcrypt.compare(
          password,
          checkEmail[0].password
        );
        if (checkPass) {
          const dataUser = {
            id: checkEmail[0].id_user,
            access: checkEmail[0].access,
            email: checkEmail[0].email,
          };
          const token = jwt.sign(dataUser, envJWT);
          const allData = {
            id: checkEmail[0].id_user,
            access: checkEmail[0].access,
            token,
          };

          success(res, "Login succes", [], allData);
        } else {
          badRequest(res, "Login failed. Wrong password.", []);
        }
      } else {
        badRequest(res, "Failed to login. Email not found", []);
      }
    } catch (error) {
      console.log(error.message);
      failed(res, "Internal server error!", error.message);
    }
  }
};

// Read all users
const controllerGetAllUsers = async (req, res) => {
  try {
    // searcing name
    const name = req.query.name;
    console.log(name);
    const search = name ? `WHERE full_name LIKE '%${name}%'` : " ";

    // order && metode (ASC, DESC)
    const sort = req.query["sort-by"] ? req.query["sort-by"] : "";
    console.log(sort);
    const order = req.query.order ? req.query.order : "asc";
    const data = sort ? `ORDER BY ${sort} ${order}` : "";

    // pagination
    const page = req.query.page ? req.query.page : 1;
    const limit = req.query.limit ? req.query.limit : 20;
    const start = page === 1 ? 0 : (page - 1) * limit;
    const pages = page ? `LIMIT ${start}, ${limit}` : "";

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

//Read user by id
const controllerGetUserById = (req, res) => {
  const UserId = req.params.userId;
  console.log(UserId);
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
  const {
    first_name,
    last_name,
    email,
    password,
    gender,
    phone_number,
    image,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !gender ||
    !phone_number ||
    !image
  ) {
    badRequest(res, "Failed to update data user. All data cannot be empty", []);
  } else {
    try {
      checkIdUser = await modelCheckIdUser(userId);

      if (checkIdUser.length !== 0) {
        const data = {
          first_name,
          last_name,
          full_name: first_name + " " + last_name,
          email,
          password,
          gender,
          phone_number,
          image,
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
  }
};

const controllerUpdateDataUser2 = async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    checkIdUser = await modelCheckIdUser(userId);

    modelUpdateDataUser(userId, data)
      .then((result) => {
        success(res, `Sucess update data user with id ${userId}`, {}, data);
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
//Delete User
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
  controllerUpdateDataUser2,
  controllerLogin,
};
