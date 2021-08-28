import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'

import Tweets from '@/components/Tweets.vue'

Vue.use(Vuetify)

describe('Tweets', () => {
  const localVue = createLocalVue()
  const vuetify = new Vuetify()

  const render = (props = {}) => {
    document.body.setAttribute('data-app', 'true')
    return shallowMount(Tweets, { localVue, vuetify, ...props })
  }

  it('sets the selected option', () => {
    const wrapper = render()
    expect(wrapper.find('timeline-stub').props().id).toEqual('hoaxDonalTrump')
  })
})
