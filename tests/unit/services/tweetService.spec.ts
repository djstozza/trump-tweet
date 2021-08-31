import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Twit from 'twit'

import TweetService from '@/services/tweetService'
import { tweetPhraseOptions } from '@/store'

const mock = new MockAdapter(axios)

describe('TweetServ ice', () => {
  describe('postTweet', () => {
    it('returns the success message', async () => {
      mock.onPost('/api/post').reply(200, { data: { messages: [] } })

      const { success, errors } = await TweetService.postTweet('Foo', tweetPhraseOptions[0])

      expect(success).toEqual('Thank you for making Twitter great again!')
      expect(errors).toEqual([])
    })

    it('returns error messages', async () => {
      mock.onPost('/api/post').reply(422, { messages: ['Error 1', 'Error 2'] })

      const { success, errors } = await TweetService.postTweet('Foo', tweetPhraseOptions[0])

      expect(success).toEqual('')
      expect(errors).toEqual(['Error 1', 'Error 2'])
    })
  })
})
