import axios from 'axios'
import elasticsearch from 'elasticsearch'
import { sample, unescape } from 'lodash'

import { TweetPhraseOption } from '../../types'

const client = new elasticsearch.Client({
  host: process.env.VUE_APP_SEARCHLY_URL
})

type PostTweetResponse = {
  success: string,
  errors: string[]
}

interface Hit {
  _source: { text: string }
}

export default {
  async postTweet (name: string, { label, matcher }: TweetPhraseOption): Promise<PostTweetResponse> {
    const args = {
      body: {
        size: 100,
        query: {
          match: { text: { query: label, operator: 'and' } }
        }
      }
    }

    const { hits: { hits } } = await client.search(args)

    const hit = sample(hits as Hit[])
    if (!hit) return { errors: ['No tweets found'], success: '' }

    const { _source: { text } }: Hit = hit

    const status = unescape(text.replaceAll('@', '').replaceAll('&amp,', '&').replaceAll(matcher, name))

    try {
      await axios.post('/api/post', null, { params: { status } })
      return { success: 'Thank you for making Twitter great again!', errors: [] }
    } catch (err) {
      const { response: { data: { messages } } } = err
      return { errors: messages, success: '' }
    }
  }
}
