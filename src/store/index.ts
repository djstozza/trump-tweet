import Vue from 'vue'
import Vuex from 'vuex'

import { State, TweetPhraseOption } from '@/types'

Vue.use(Vuex)

export const tweetPhraseOptions = [
  { label: 'Crooked Hillary', matcher: 'hillary(\\s+clinton)?|clinton' },
  { label: 'Crazy Bernie', matcher: 'bernie(\\s+sanders)?|sanders' },
  { label: "Cryin' Chuck", matcher: 'chuck(\\s+schumer)?|schumer' },
  { label: 'Do Nothing Democrats', matcher: 'democrat' },
  { label: 'Dopey Sugar', matcher: 'sugar((—|\\s|-|\\.)lord_sugar)?' },
  {
    label: 'Dumb as a rock',
    matcher: 'AOC|billmaher|Rex Tillerson|Mika|Jonah Goldberg JonahNRO|Don Lemon|GlennBeck|Gumbel|Bryant|TheRickWilson|Toure|Bush|hardball_chris'
  },
  { label: 'Fake News CNN', matcher: 'CNN' },
  { label: 'Lightweight Schneiderman', matcher: '(ag?)schneiderman|Eric Schneiderman|schneiderman' },
  { label: 'Little Marco', matcher: 'marco(\\s+rubio)?|rubio' },
  { label: 'Low energy Jeb', matcher: 'jeb(\\s+bush)?|bush' },
  { label: "Lyin' Ted", matcher: 'ted(\\s+cruz)?|cruz' },
  { label: 'Mini Mike', matcher: '(mike|michael)(\\s+b)?(loomberg)?|bloomberg' },
  { label: 'Nervous Nancy', matcher: 'nancy(\\s+pelosi)?|pelosi' },
  { label: 'Obamacare', matcher: 'barack(\\s+obama)?|obama' },
  { label: 'Shifty Schiff', matcher: 'adam(\\s+schiff)?|schiff' },
  { label: 'Sleepy Joe', matcher: 'joe(\\s+biden)?|biden' }
]

export const initialState = {
  tweetPhraseOptions,
  selectedPhrase: undefined,
  name: '',
  errors: [],
  success: '',
  latestTweetId: ''
}

export const mutations = {
  setSelectedPhrase: (state: State, tweet?: TweetPhraseOption): void => { state.selectedPhrase = tweet },
  setName: (state: State, name: string): void => { state.name = name },
  setErrors: (state: State, errors: string[]): void => { state.errors = errors },
  setSuccess: (state: State, success: string): void => { state.success = success },
  socketBroadcastTweet: (state: State, tweetId: string): void => { state.latestTweetId = tweetId }
}

export default new Vuex.Store({
  state: initialState,
  mutations,
  actions: {
  },
  modules: {
  }
})
