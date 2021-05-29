//import controller
const connection = require("./src/configs/db");

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
// static router
app.use("/img", express.static("./src/uploads"));
// Set default
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Tickitz Server",
  });
});

// while url not defined
app.use("/*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "URL Not Found",
  });
});

//app use crone job
const CronJob = require("cron").CronJob;
//program dijalankan setiap jam 4 pagi setiap harinya
var job = new CronJob(
  "0 00 04 * * *",
  function () {
    connection.query(`SELECT * FROM tb_movies `, (err, results) => {
      if (!err) {
        console.log(results);
        results.map((item, index) => {
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          const data = {
            id_movie: item.id_movie,
            id_cinema: Math.floor(Math.random() * 4 + 1),
            playing_time: "20:00",
            playing_date: `${tomorrow.getFullYear()}-${
              tomorrow.getMonth() + 1
            }-${tomorrow.getDate()}`,
            price: "35000",
            created_at: today,
            updated_at: today,
          };
          connection.query(
            "INSERT INTO tb_schedule_movies SET ?",
            data,
            (err, result) => {
              if (!err) {
                if (results.length === index + 1) {
                  console.log("Success creat new schedule for today");
                }
              } else {
                console.log("cronjob error insert schedule", err.message);
              }
            }
          );
        });
      } else {
        console.log("cronjob error get all movie", err.message);
      }
    });
  },
  null,
  true,
  "Asia/Jakarta"
);
job.start();
