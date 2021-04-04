const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const {
  envPORT,
  envJWT,
  envURLFrontEnd,
  envURLImage,
} = require("../helpers/env");
const { sendEmail } = require("../helpers/email");
const jwt = require("jsonwebtoken");

const {
  modelAddUser,
  modelGetUserById,
  modelGetAllUsers,
  modelDeleteUser,
  modelUpdateDataUser,
  modelReadTotalUsers,
  modelCheckEmail,
  modelCheckIdUser,
  createActivation,
  getActivation,
  setActivationUser,
  deleteActivation,
} = require("../models/model_users");

const { response } = require("../helpers/response");

// register
const controllerAddUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return response(res, [], {}, 401, {
      message: "Failed to register. Email and password cannot be empty",
      error: null,
    });
  } else {
    try {
      const checkEmail = await modelCheckEmail(email.toLowerCase());
      if (checkEmail.length === 0) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const data = {
          id_user: uuidv4(),
          email: email.toLowerCase(),
          password,
          created_at: new Date(),
          updated_at: new Date(),
        };
        const token = jwt.sign({ identify: data }, envJWT);
        modelAddUser(data)
          .then((result) => {
            createActivation(data.email, token)
              .then((result) => {
                sendEmail(data.email, token)
                  .then((result) => {
                    return response(res, [], {}, 200, {
                      message:
                        "Please check your email to activated your account",
                      error: null,
                    });
                  })
                  .catch((err) => {
                    return response(res, [], {}, 500, {
                      message: "Internal server error",
                      error: err.message,
                    });
                  });
              })
              .catch((err) => {
                return response(res, [], {}, 500, {
                  message: "Internal server error",
                  error: err.message,
                });
              });
          })
          .catch((err) => {
            console.log(err.message);
            return response(res, [], {}, 500, {
              message: "Internal server error",
              error: err.message,
            });
          });
      } else {
        return response(res, [], {}, 401, {
          message:
            "Failed to register. Email has been used. Please login or activated your email.",
          error: null,
        });
      }
    } catch (err) {
      console.log(err.message);
      return response(res, [], {}, 500, {
        message: "Internal server error",
        error: err.message,
      });
    }
  }
};

// Login
const controllerLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return response(res, [], {}, 401, {
      message: "Failed to login. Email and password cannot be empty",
      error: null,
    });
  } else {
    try {
      const checkEmail = await modelCheckEmail(email.toLowerCase());
      if (checkEmail.length === 1) {
        const checkPass = await bcrypt.compare(
          password,
          checkEmail[0].password
        );
        if (checkPass) {
          if (checkEmail[0].is_verify !== 1) {
            return response(res, [], {}, 401, {
              message:
                "Login failed. Account is not activated yet! Check your email.",
              error: null,
            });
          } else {
            const dataUser = {
              id_user: checkEmail[0].id_user,
              access: checkEmail[0].access,
              email: checkEmail[0].email,
            };
            const token = jwt.sign(
              dataUser,
              envJWT,
              { expiresIn: "12h" },
              (err, token) => {
                const allData = {
                  id_user: checkEmail[0].id_user,
                  access: checkEmail[0].access,
                  profil_image: `${envURLImage}/${checkEmail[0].profil_image}`,
                  email: checkEmail[0].email,
                  token,
                };
                return response(res, allData, {}, 200, {
                  message: "Succes login",
                });
              }
            );
            // const allData = {
            //   id: checkEmail[0].id_user,
            //   access: checkEmail[0].access,
            //   token,
            // };
          }
        } else {
          return response(res, [], {}, 401, {
            message: "Login failed. Wrong password.",
            error: null,
          });
        }
      } else {
        return response(res, [], {}, 401, {
          message: "Failed to login. Email not found.",
          error: null,
        });
      }
    } catch (err) {
      console.log(err.message);
      return response(res, [], {}, 500, {
        message: "Internal server error",
        error: err.message,
      });
    }
  }
};

// Read all users
const controllerGetAllUsers = async (req, res) => {
  try {
    // searcing name
    const name = req.query.name;
    const search = name ? `WHERE full_name LIKE '%${name}%'` : " ";

    // order && metode (ASC, DESC)
    const sort = req.query["sort-by"] ? req.query["sort-by"] : "";
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

          return response(res, result, pagination, 200, {
            message: "Success get data user",
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

// Read user by id
const controllerGetUserById = (req, res) => {
  const UserId = req.params.userId;
  modelGetUserById(UserId)
    .then((result) => {
      if (result.length > 0) {
        result[0].profil_image = `${envURLImage}/${result[0].profil_image}`;
        return response(res, result, {}, 200, {
          message: `Success get data user with id ${UserId}`,
          error: null,
        });
      } else {
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
};

// update
const controllerUpdateDataUser = async (req, res) => {
  const userId = req.params.userId;
  const {
    first_name,
    last_name,
    email,
    password,
    profil_image,
    phone_number,
  } = req.body;
  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !profil_image ||
    !phone_number
  ) {
    return response(res, [], {}, 401, {
      message: "Failed to  add data user. All data cannot be empty.",
      error: null,
    });
  } else {
    try {
      const checkIdUser = await modelCheckIdUser(userId);

      if (checkIdUser.length !== 0) {
        const data = {
          first_name,
          last_name,
          email,
          password,
          profil_image,
          phone_number,
          updated_at: new Date(),
        };
        modelUpdateDataUser(userId, data)
          .then((result) => {
            return response(res, [data], {}, 200, {
              message: "Succes update data user",
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
          message: "There are no movie with this id",
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
  }
};

// update
const controllerUpdateDataUser2 = async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const checkIdUser = await modelCheckIdUser(userId);
    if (checkIdUser.length === 0) {
      return response(res, [], {}, 404, {
        message: "There are no user with this id",
        error: null,
      });
    } else {
      const last_profile = await modelGetUserById(userId);
      data.profil_image = req.file
        ? `${req.file.filename}`
        : last_profile[0].profil_image;
      modelUpdateDataUser(userId, data)
        .then((result) => {
          data.profil_image = `${envURLImage}/${data.profil_image}`;
          return response(res, [data], {}, 200, {
            message: "Succes update data user",
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
    }
  } catch (err) {
    console.log(err.message);
    return response(res, [], {}, 500, {
      message: "Internal server error!",
      error: err.message,
    });
  }
};
// Delete User
const controllerDeleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const checkIdUser = await modelCheckIdUser(userId);
    if (checkIdUser.length !== 0) {
      modelDeleteUser(userId)
        .then((result) => {
          return response(res, [], {}, 200, {
            message: "Succes delete data user",
            error: null,
          });
        })
        .catch((err) => {
          console.log(err.mesage);
          return response(res, [], {}, 500, {
            message: "Internal server error!",
            error: err.message,
          });
        });
    } else {
      return response(res, [], {}, 404, {
        message: "There are no movie user with this id",
        error: null,
      });
    }
  } catch (err) {
    return response(res, [], {}, 500, {
      message: "Internal server error!",
      error: err.message,
    });
  }
};

const controllerGetProfile = (req, res) => {
  const token = req.token;
  const email = req.email;
  modelCheckEmail(email)
    .then((result) => {
      const data = {
        id_user: result[0].id_user,
        profil_image: `${envURLImage}/${result[0].profil_image}`,
        access: result[0].access,
        token,
        email,
      };
      return response(res, data, {}, 200, {
        message: "Succes get profile",
        error: null,
      });
    })
    .catch((err) => {
      return response(res, [], {}, 500, {
        message: "Internal server error",
        error: err.message,
      });
    });
};

const controllerActivation = (req, res) => {
  getActivation(req.params.token, req.params.email)
    .then((result) => {
      const id_activation = result[0].id;
      setActivationUser(req.params.email)
        .then((result) => {
          deleteActivation(id_activation)
            .then((result) => {
              return res.status(301).redirect(`${envURLFrontEnd}`);
            })
            .catch((err) => {
              return response(res, [], {}, 500, {
                message: "Internal server error!",
                error: err.message,
              });
            });
        })
        .catch((err) => {
          return response(res, [], {}, 500, {
            message: "Internal server error!",
            error: err.message,
          });
        });
    })
    .catch((err) => {
      return response(res, [], {}, 500, {
        message: "Internal server error!",
        error: err.message,
      });
    });
};

module.exports = {
  controllerGetUserById,
  controllerAddUser,
  controllerGetAllUsers,
  controllerUpdateDataUser,
  controllerDeleteUser,
  controllerUpdateDataUser2,
  controllerLogin,
  controllerGetProfile,
  controllerActivation,
};
