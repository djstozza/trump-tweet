import axios from 'axios'
import elasticsearch from 'elasticsearch'
import { sample, unescape } from 'lodash'
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
          match: {
            text: {
              query: label,
              operator: 'and'
            }
          }
        }
      }
    }

    const { hits: { hits } } = await client.search(args)
    const { _source: { text } } = sample(hits)
    const status = unescape(text.replaceAll('@', '').replaceAll(matcher, name))

    axios
      .post('/api/post', null, { params: { status } })
      .catch(({ response: { data: { messages } } }) => {
        console.log('fooo', messages)
      })
      .then(({ data: { messages } = {} }) => {
        if (!messages) return
        console.log(messages)
      })
  }
}
