const redis = require("redis");
const client = redis.createClient("/home/nevalena/redis.sock");
const { response } = require("../helpers/response");

const cacheUpComing = (req, res, next) => {
  if (req.query.page || req.query.limit) {
    next();
  } else {
    client.get("getUpComing", (err, data) => {
      console.log(data);
      if (data !== null) {
        const { result, pagination } = JSON.parse(data);
        return response(res, result, pagination, 200, {
          message: "Success get data up coming redis",
          error: null,
        });
      } else {
        next();
      }
    });
  }
};

const cacheNowShowing = (req, res, next) => {
  client.get("getNowShowing", (err, data) => {
    if (req.query.page || req.query.limit) {
      next();
    } else {
      if (data !== null) {
        const { result, pagination } = JSON.parse(data);
        return response(res, result, pagination, 200, {
          message: "Success get data now showing redis",
          error: null,
        });
      } else {
        next();
      }
    }
  });
};
const clearNowAndUp = (req, res, next) => {
  client.del("getUpComing");
  client.del("getNowShowing");
  next();
};

module.exports = {
  cacheUpComing,
  cacheNowShowing,
  clearNowAndUp,
};
