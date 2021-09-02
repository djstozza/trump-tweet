import { Request, Response } from 'express'
import axios from 'axios'
import sample from 'lodash/sample'
import unescape from 'lodash/unescape'

import { twit } from './tweet'

const setStatus = async (name: string, label: string , matcher: string) => {
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
    const { data: { hits: { hits } } } = await axios.post(process.env.SEARCHLY_URL!, args, { headers })
    const hit = sample(hits)
    const { _source: { text } } = hit

    return unescape(text.replace(/@/g, '').replace(/&amp,/g, '&').replace(new RegExp(matcher, 'ig'), name))
  } catch (error) {
    console.log(error)
  }
}

const PostTweet = async (req: Request, res: Response) => {
  const { query: { name, label, matcher } } = req

  const errors = []
  if (!name) errors.push('Name is required')
  if (!label || !matcher) errors.push('Selected phrase is required')
  if (errors.length) return res.status(422).send({ messages: errors })

  if (typeof name !== 'string') return res.status(422).send({ messages: ['Name is invalid'] })
  if (typeof label !== 'string' || typeof matcher !== 'string') {
    return res.status(422).send({ messages: ['Selected phrase is invalid'] })
  }

  const status = await setStatus(name, label, matcher)

  if (!status) return res.status(422).send({ messages: ['Unable to create at this time'] })

  try {
    await twit.post('statuses/update', { status })
    return res.send()
  } catch (error: any) {
    const { statusCode, allErrors } = error
    const messages = allErrors.map(({ message }:{ message: string }) => message)
    return res.status(statusCode).send({ messages })
  }
}

export default PostTweet
