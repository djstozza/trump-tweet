const express = require('express')
const request = require('request')
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')
const axios = require('axios')
const sample = require('lodash/sample')
const unescape = require('lodash/unescape')

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

const setStatus = async (name, label, matcher) => {
  const args = {
    size: 100,
    query: {
      match: { text: { query: label, operator: 'and' } }
    }
  }

  const headers = {
    Authorization: `Basic ${process.env.AUTH}`
  }

  try {
    const { data: { hits: { hits } } } = await axios.post(process.env.SEARCHLY_URL, args, { headers })
    const hit = sample(hits)
    const { _source: { text } } = hit
    return unescape(text.replace(/@/g, '').replace(/&amp,/g, '&').replace(new RegExp(matcher, 'ig'), name))
  } catch (error) {
    console.log(error)
  }
}

app.post('/api/post', async (req, res) => {
  const { query } = req
  const { name, label, matcher } = query
  const status = await setStatus(name, label, matcher)

  if (!status) {
    res.statusCode = 422
    res.send({ messages: ['Unable to create at this time'] })
    return
  }

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
