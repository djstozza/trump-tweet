import axios from 'axios'

import { TweetPhraseOption } from '@/types'

type PostTweetResponse = {
  success: string,
  errors: string[]
}

export default {
  async postTweet (name: string, { label, matcher }: TweetPhraseOption): Promise<PostTweetResponse> {
    try {
      await axios.post('/api/post', null, { params: { name, label, matcher } })

      return { success: 'Thank you for making Twitter great again!', errors: [] }
    } catch (err: any) {
      const { response: { data: { messages } } } = err

      return { errors: messages, success: '' }
    }
  }
}
