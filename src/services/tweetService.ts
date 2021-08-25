import axios from 'axios'
import elasticsearch from 'elasticsearch'
import { sample, unescape } from 'lodash'

// import store from '@/store'

const client = new elasticsearch.Client({
  host: process.env.VUE_APP_SEARCHLY_URL
})

type SelectedPhrase = {
  label: string,
  matcher: string
}

export default {
  async postTweet (name: string, { label, matcher }: SelectedPhrase) {
    const args = {
      body: {
        size: 100,
        query: {
          match: { text: { query: label, operator: 'and' } }
        }
      }
    }

    const { hits: { hits } } = await client.search(args)
    const { _source: { text } } = sample(hits)

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
