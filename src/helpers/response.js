const response = (res, data, pagination, status, message) => {
  const result = {
    status,
    information: message || null,
    pagination,
    data,
  };
  res.status(status).json(result);
};

const success = (res, message, pagination, data) => {
  const response = {
    status: 200,
    message,
    pagination,
    data,
  };
  res.status(200).json(response);
};

const createData = (res, message, data) => {
  const response = {
    status: 201,
    message,
    data,
  };
  res.status(201).json(response);
};

const failed = (res, message, data) => {
  const response = {
    status: 500,
    message,
    data,
  };
  res.status(500).json(response);
};

const notFound = (res, message, data) => {
  const response = {
    status: 404,
    message,
    data,
  };
  res.status(404).json(response);
};

const badRequest = (res, message, data) => {
  const response = {
    code: 400,
    message,
    data,
  };
  res.status(400).json(response);
};

const large = (res, message, data) => {
  const response = {
    code: 413,
    message,
    data,
  };
  res.status(413).json(response);
};
const notAcceptable = (res, message, data) => {
  const response = {
    code: 406,
    message,
    data,
  };
  res.status(406).json(response);
};
const notAllowed = (res, message, data) => {
  const response = {
    code: 405,
    message,
    data,
  };
  res.status(405).json(response);
};
const expFailde = (res, message, data) => {
  const response = {
    code: 417,
    message,
    data,
  };
  res.status(417).json(response);
};

module.exports = {
  badRequest,
  createData,
  failed,
  notFound,
  success,
  response,
  large,
  notAcceptable,
  notAllowed,
  expFailde,
};
