const client = require('../configs/redis')
const _ = require('lodash')
const { response } = require('../helpers/response')

const getAllMovies = (req, res, next) => {
  client.get('dataAllMovies', (error, result) => {
    if (!error) {
      if (result) {
        // sort && methode (ASC, DESC)
        const data = JSON.parse(result)
        const sortby = req.query['sort-by'] ? req.query['sort-by'] : ''
        const order = req.query.order ? req.query.order : 'desc'
        // const data = sortby ? `ORDER BY ${sortby} ${order}` : "";

        // searcing name
        const searchby = req.query['search-by']
          ? req.query['search-by']
          : 'movie_title'
        const item = req.query.item ? req.query.item : ''
        // const search = item ? `WHERE ${searchby} LIKE '%${item}%'` : " ";

        // pagination
        const page = req.query.page ? req.query.page : 1
        const limit = req.query.limit ? req.query.limit : 20
        const start = page === 1 ? 0 : (page - 1) * limit
        // const pages = page ? `LIMIT ${start}, ${limit}` : "";

        const filtering = _.filter(data, (items) => {
          return items[searchby]
            .toString()
            .toLowerCase()
            .includes(item.toString().toLowerCase())
        })
        // res.status(200).json(filtering);
        // console.log(filtering);
        if (filtering.length > 0) {
          const sorting = _.orderBy(
            filtering,
            sortby,
            order.toString().toLowerCase()
          )
          const dataResultFromPagination = _.slice(
            sorting,
            start,
            start + Number(limit)
          )
          const pagination = {
            page: page,
            limit: limit,
            totalData: filtering.length,
            totalPage: Math.ceil(filtering.length / limit)
          }
          return response(res, dataResultFromPagination, pagination, 200, {
            message: 'redis',
            error: null
          })
        } else {
          return response(res, {}, {}, 404, {
            message: 'Oops, data not found.',
            error: null
          })
        }
      } else {
        next()
      }
    } else {
      return response(res, [], {}, 500, {
        message: 'Internal server error',
        error: error.message
      })
    }
  })
}

module.exports = {
  getAllMovies
}
