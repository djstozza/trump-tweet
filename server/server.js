const express = require('express')
const request = require('request')
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')

const Twit = require('twit')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8081

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
  app.get('*', (request, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
  })
}

const server = http.createServer(app)
server.listen(port, () => console.log(`Listening on port ${port}`))

const origins = process.env.NODE_ENV === 'development' ? [process.env.APP_URL, process.env.VUE_CLIENT_URL] : ['/']

const io = socketIo(server, {
  cors: {
    origins,
    methods: ['GET', 'POST']
  }
})

app.post('/api/post', ({ query: { status } }, res) => {
  T.post('statuses/update', { status })
    .catch(error => {
      const { statusCode, allErrors } = error
      const messages = allErrors.map(({ message }) => message)

      res.statusCode = statusCode
      res.send({ messages })
    })
    .then(success => {
      if (!success) return
      res.send()
    })
})

const stream = T.stream('statuses/filter', { follow: process.env.TWITTER_ID })

stream.on('tweet', ({ id }) => {
  io.emit('broadcastTweet', id)
})
