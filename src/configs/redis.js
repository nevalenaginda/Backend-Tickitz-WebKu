const redis = require('redis')
const redisClient = redis.createClient("/home/nevalena/redis.sock");

redisClient.on('error', (error) => {
  console.log(error + 'sumpah')
})

module.exports = redisClient
