import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const tweetPhraseOptions = [
  { label: 'Crooked Hillary', matcher: /hillary(\s+clinton)?|clinton/ig },
  { label: 'Crazy Bernie', matcher: /bernie(\s+sanders)?|sanders/ig },
  { label: "Cryin' Chuck", matcher: /chuck(\s+schumer)?|schumer/ig },
  { label: 'Do Nothing Democrats', matcher: /democrat/ig },
  { label: 'Dopey Sugar', matcher: /sugar((—|\s|-|\.)lord_sugar)?/ig },
  {
    label: 'Dumb as a rock',
    matcher: /AOC|billmaher|Rex Tillerson|Mika|Jonah Goldberg @JonahNRO|Don Lemon|GlennBeck|Gumbel|Bryant|TheRickWilson|Toure|Bush|hardball_chris/ig
  },
  { label: 'Fake News CNN', matcher: /CNN/ig },
  { label: 'Lightweight Schneiderman', matcher: /(ag?)schneiderman|Eric Schneiderman|schneiderman/ig },
  { label: 'Little Marco', matcher: /marco(\s+rubio)?|rubio/ig },
  { label: 'Low energy Jeb', matcher: /jeb(\s+bush)?|bush/ig },
  { label: "Lyin' Ted", matcher: /ted(\s+cruz)?|cruz/ig },
  { label: 'Mini Mike', matcher: /(mike|michael)(\s+b)?(loomberg)?|bloomberg/ig },
  { label: 'Nervous Nancy', matcher: /nancy(\s+pelosi)?|pelosi/ig },
  { label: 'Obamacare', matcher: /barack(\s+obama)?|obama/ig },
  { label: 'Shifty Schiff', matcher: /adam(\s+schiff)?|schiff/ig },
  { label: 'Sleepy Joe', matcher: /joe(\s+biden)?|biden/ig }
]

export default new Vuex.Store({
  state: {
    tweetPhraseOptions,
    selectedPhrase: null,
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
