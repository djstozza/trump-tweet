import Vue from 'vue'
import Vuex from 'vuex'

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

export default new Vuex.Store({
  state: {
    tweetPhraseOptions,
    selectedPhrase: undefined,
    name: '',
    errors: [],
    success: ''
  },
  mutations: {
    setSelectedPhrase: (state, tweet) => {
      state.selectedPhrase = tweet
    },
    setName: (state, name) => {
      state.name = name
    },
    setErrors: (state, errors) => { state.errors = errors },
    setSuccess: (state, success) => { state.success = success }
  },
  actions: {
  },
  modules: {
  }
})
