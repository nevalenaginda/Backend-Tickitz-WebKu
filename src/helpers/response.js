const success = (res, message, pagination, data) => {
  const response = {
    status: 200,
    message,
    pagination,
    data,
  };
  res.json(response);
};

const createData = (res, message, data) => {
  const response = {
    status: 200,
    message,
    data,
  };
  res.json(response);
};

const failed = (res, message, data) => {
  const response = {
    status: 500,
    message,
    data,
  };
  res.json(response);
};

const notFound = (res, message, data) => {
  const response = {
    status: 404,
    message,
    data,
  };
  res.json(response);
};

const badRequest = (res, message, data) => {
  const response = {
    code: 400,
    message,
    data,
  };
  res.json(response);
};

module.exports = {
  badRequest,
  createData,
  failed,
  notFound,
  success,
};
