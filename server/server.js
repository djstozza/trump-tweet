const express = require('express')
const request = require('request')

const Twit = require('twit')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8081
const OAUTH_CALLBACK_URL = process.env.APP_URL

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_SECRET_KEY,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (request, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`))

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
      res.send({ messages: ["You're making twitter great again!"] })
    })
})
