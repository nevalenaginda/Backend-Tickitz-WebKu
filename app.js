const express = require("express");
// const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const { envPORT } = require("./src/helpers/env");
const indexRouter = require("./src/routers/index");

const app = express();

app.listen(envPORT || 3000, () => {
  console.log(`app is running on port http://localhost:${envPORT || 3000}`);
});

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

// use cors for enabling CORS
app.use(cors());

// use morgan
app.use(morgan("dev"));

// versioning
app.use("/v1", indexRouter);

// Set default
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Project CRUD RESTfull API Database Ticket",
  });
});

// while url not defined
app.use("/*", (req, res, next) => {
  res.status(404).json({
    status: 404,
    message: "URL Not Found",
  });
});
