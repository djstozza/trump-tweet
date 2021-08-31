import express from 'express'
import request from 'request'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'
import axios from 'axios'
import { sample, unescape } from 'lodash'
import * as dotenv from 'dotenv'

dotenv.config()

import { twit } from './tweet'
import PostTweet from './postTweet'

const app = express()
const port = (process.env.NODE_ENV === 'test' ? process.env.TEST_PORT : process.env.PORT) || 8081

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')))
  app.get('*', (request, res) => {
    res.sendFile(path.join(__dirname, '../dist', 'index.html'))
  })
}

export const server = http.createServer(app)

const origin = process.env.NODE_ENV === 'development' ? process.env.VUE_CLIENT_URL : '/'

export const io = new Server(server, {
  cors: {
    origin,
    methods: ['GET', 'POST']
  }
})

server.listen(port, () => {})

app.post('/api/post', PostTweet)

export const stream = twit.stream('statuses/filter', { follow: process.env.TWITTER_ID })

stream.on('tweet', ({ id }:{ id: string }) => io.emit('broadcastTweet', id))
