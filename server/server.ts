import request from 'request'
import http from 'http'
import { Server } from 'socket.io'

import app from './app'

import { twit } from './tweet'

export const server = http.createServer(app)

export const origin = () => process.env.NODE_ENV === 'development' ? process.env.VUE_CLIENT_URL : '/'

export const io = new Server(server, {
  cors: {
    origin: origin(),
    methods: ['GET', 'POST']
  }
})

export const stream = twit.stream('statuses/filter', { follow: process.env.TWITTER_ID })

stream.on('tweet', ({ id }:{ id: string }) => io.emit('BroadcastTweet', id))

export default server
