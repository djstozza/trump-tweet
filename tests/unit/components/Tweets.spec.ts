import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import Tweets from '@/components/Tweets.vue'

Vue.use(Vuetify)

describe('Tweets', () => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify()

  localVue.use(Vuex)

  const STATE = {
    latestTweetId: ''
  }

  const render = (props = {}, context = {}) => {
    const store = new Vuex.Store({
      state: STATE,
      ...context
    })
    document.body.setAttribute('data-app', 'true')
    return shallowMount(Tweets, { store, localVue, vuetify, ...props })
  }

  it('sets renders the tweet feed', () => {
    const wrapper = render({}, { latestTweetId: '123' })

    expect(wrapper.find('timeline-stub').props().id).toEqual('hoaxDonalTrump')
  })

  it('changes the height on window resize', () => {
    const wrapper = render({}, { latestTweetId: '123' })

    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 150
    })

    window.dispatchEvent(new Event('resize'))
    expect(wrapper.vm.$data.height).toEqual('86px')
  })
})
