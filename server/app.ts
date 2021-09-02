import express from 'express'
import { Request, Response } from 'express'
import path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

import { twit } from './tweet'
import PostTweet from './postTweet'

const app = express()

export const staticPath = path.join(__dirname, '../dist')
export const sendFilePath = path.join(__dirname, '../dist', 'index.html')
export const sendFile = (_req: Request, res: Response) => res.sendFile(sendFilePath)

export const productionSetup = () => {
  if (process.env.NODE_ENV !== 'production') return

  app.use(express.static(staticPath))
  app.get('*', sendFile)
}

productionSetup()

app.post('/api/post', PostTweet)

export default app
