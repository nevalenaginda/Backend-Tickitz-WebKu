const express = require('express')
const Route = express.Router()

const routerUser = require('./router_users')
const routerTicket = require('./router_tickets')
const routerTransaction = require('./router_transactions')
const routerMovie = require('./router_movies')
const routeSchedule = require('./router_schedules')
const routeCinema = require('./router_cinemas')
const routeSeat = require('./router_seats')
// router
Route.use('/user', routerUser)
Route.use('/ticket', routerTicket)
Route.use('/transaction', routerTransaction)
Route.use('/movie', routerMovie)
Route.use('/schedule', routeSchedule)
Route.use('/cinema', routeCinema)
Route.use('/seat', routeSeat)

module.exports = Route
