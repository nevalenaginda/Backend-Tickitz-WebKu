const success = (res, message, pagination, data) => {
  const response = {
    status: 200,
    message,
    pagination,
    data
  }
  res.status(200).json(response)
}

const createData = (res, message, data) => {
  const response = {
    status: 201,
    message,
    data
  }
  res.status(201).json(response)
}

const failed = (res, message, data) => {
  const response = {
    status: 500,
    message,
    data
  }
  res.status(500).json(response)
}

const notFound = (res, message, data) => {
  const response = {
    status: 404,
    message,
    data
  }
  res.status(404).json(response)
}

const badRequest = (res, message, data) => {
  const response = {
    code: 400,
    message,
    data
  }
  res.status(400).json(response)
}

module.exports = {
  badRequest,
  createData,
  failed,
  notFound,
  success
}
