const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { envPORT } = require("./src/helpers/env");

const app = express();

const routerUser = require("./src/routers/router_users");
const routerTicket = require("./src/routers/router_tickets");
const routerTransaction = require("./src/routers/router_transactions");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// use cors for enabling CORS
app.use(cors());

// Set default
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Project CRUD RESTfull API Database Ticket",
  });
});

// router user
app.use("/user", routerUser);

// router ticket
app.use("/ticket", routerTicket);

// router transaction
app.use("/transaction", routerTransaction);

app.listen(envPORT || 3000, () => {
  console.log(`app is running on port http://localhost:${envPORT || 3000}`);
});
