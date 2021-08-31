import Twit from 'twit'

export const twit = new Twit({
  consumer_key: process.env.TWITTER_API_KEY || '',
  consumer_secret: process.env.TWITTER_SECRET_KEY || '',
  access_token: process.env.TWITTER_ACCESS_TOKEN || '',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ''
})
