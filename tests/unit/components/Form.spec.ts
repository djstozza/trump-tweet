import { mount, createLocalVue, Wrapper } from '@vue/test-utils'
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import Form from '@/components/Form.vue'
import { tweetPhraseOptions } from '@/store'
import TweetService from '@/services/tweetService'

import { TweetPhraseOption } from '../../../types'

type State = {
  tweetPhraseOptions: TweetPhraseOption[],
  selectedPhrase?: TweetPhraseOption,
  name: string,
  errors: string[],
  success: string
}

Vue.use(Vuetify)

describe('Form', () => {
  const localVue = createLocalVue()

  localVue.use(Vuex)

  const vuetify = new Vuetify()

  const STATE = {
    tweetPhraseOptions,
    selectedPhrase: undefined,
    name: '',
    errors: [],
    success: ''
  }

  const MUTATIONS = {
    setSelectedPhrase: () => {},
    setName: (state: State, name: string) => {},
    setErrors: (state: State, errors: string[]) => {},
    setSuccess: (state: State, success: string) => {}
  }

  const render = (props = {}, context = {}) => {
    const store = new Vuex.Store({
      state: STATE,
      mutations: MUTATIONS,
      ...context
    })
    document.body.setAttribute('data-app', 'true')
    return mount(Form, { store, localVue, vuetify, ...props })
  }

  const selectField = (wrapper: Wrapper<Vue, Element>) => wrapper.find('.v-select')
  const textField = (wrapper: Wrapper<Vue, Element>) => wrapper.find('.v-text-field')
  const submit = (wrapper: Wrapper<Vue, Element>) => wrapper.findAll("button[type='button']").at(0)
  const clear = (wrapper: Wrapper<Vue, Element>) => wrapper.findAll("button[type='button']").at(1)
  const snackbars = (wrapper: Wrapper<Vue, Element>) => wrapper.findAll('.v-snack--active')

  it('sets the selected option', async () => {
    const setSelectedPhrase = jest.fn()
    const mutations = {
      ...MUTATIONS,
      setSelectedPhrase
    }
    const wrapper = render({}, { mutations })

    selectField(wrapper).find("[role='button']").trigger('click')
    await localVue.nextTick()
    wrapper.findAll('.v-list-item').at(1).trigger('click')
    await localVue.nextTick()

    expect(setSelectedPhrase)
      .toHaveBeenCalledWith(STATE, tweetPhraseOptions[1])
  })

  it('sets the name', () => {
    const setName = jest.fn()
    const mutations = {
      ...MUTATIONS,
      setName
    }
    const wrapper = render({}, { mutations })

    textField(wrapper).find('input').setValue('name')
    expect(setName).toHaveBeenCalledWith(STATE, 'name')
  })

  it('renders the text value from the state', () => {
    const state = {
      ...STATE,
      name: 'Foo'
    }

    const wrapper = render({}, { state })
    expect(textField(wrapper).props().value).toEqual('Foo')
  })

  it('displays an error if the text field and select are left blank on blur', async () => {
    const wrapper = render()

    textField(wrapper).find('input').trigger('blur')
    selectField(wrapper).find('input').trigger('blur')

    await localVue.nextTick()

    expect(textField(wrapper).props().errorMessages).toEqual(['Name is required'])
    expect(textField(wrapper).find('.v-messages.error--text').text()).toEqual('Name is required')

    expect(selectField(wrapper).props().errorMessages).toEqual(['Phrase is required'])
    expect(selectField(wrapper).find('.v-messages.error--text').text()).toEqual('Phrase is required')
  })

  it('shows both the submit and clear buttons as being disabled if there are no values', () => {
    const wrapper = render()

    expect(submit(wrapper).props().disabled).toEqual(true)
    expect(clear(wrapper).props().disabled).toEqual(true)
  })

  it('enables the submit button if there is a name and selectedPhrase', async () => {
    const postTweet =
      jest
      .spyOn(TweetService, 'postTweet')
      .mockReturnValue(Promise.resolve({ success: 'Success!', errors: ['Error 1', 'Error 2'] }))

      const setSuccess = jest.fn()
      const setErrors = jest.fn()
      const setSelectedPhrase = jest.fn()

      const mutations = {
        ...MUTATIONS,
        setSuccess,
        setErrors
      }

    const state = {
      ...STATE,
      name: 'Foo',
      selectedPhrase: tweetPhraseOptions[0]
    }

    const wrapper = render({}, { state, mutations })

    submit(wrapper).trigger('click')

    expect(postTweet).toHaveBeenCalledWith('Foo', tweetPhraseOptions[0])
    expect(setSuccess).toHaveBeenCalledWith(state, '')
    expect(setErrors).toHaveBeenCalledWith(state, [])

    expect(wrapper.vm.$data.showSuccess).toEqual(false)
    expect(wrapper.vm.$data.showErrors).toEqual(false)
    expect(wrapper.vm.$data.submitting).toEqual(true)

    await localVue.nextTick()
    await localVue.nextTick()

    expect(setSuccess).toHaveBeenCalledWith(state, 'Success!')
    expect(setErrors).toHaveBeenCalledWith(state, ['Error 1', 'Error 2'])
    expect(wrapper.vm.$data.showSuccess).toEqual(true)
    expect(wrapper.vm.$data.showErrors).toEqual(true)
    expect(wrapper.vm.$data.submitting).toEqual(false)
  })

  it('disables the submit and clear buttons if submitting = true, even if other values are present', () => {
    const state = {
      ...STATE,
      name: 'Foo',
      selectedPhrase: tweetPhraseOptions[0]
    }

    const data = () => ({ submitting: true })
    const wrapper = render({ data }, { state })

    expect(submit(wrapper).props().disabled).toEqual(true)
    expect(clear(wrapper).props().disabled).toEqual(true)
  })

  it('enables the clear button if one of the values are satisfied but the submit button is still disabled', () => {
    const setSelectedPhrase = jest.fn()
    const setName = jest.fn()

    const state = {
      ...STATE,
      name: 'Foo'
    }

    const mutations = {
      ...MUTATIONS,
      setSelectedPhrase,
      setName
    }

    const wrapper = render({}, { state, mutations })
    expect(submit(wrapper).props().disabled).toEqual(true)
    expect(clear(wrapper).props().disabled).toEqual(false)

    clear(wrapper).trigger('click')

    expect(setName).toHaveBeenCalledWith(state, '')
    expect(setSelectedPhrase).toHaveBeenCalledWith(state, undefined)
  })

  it('shows snackbar errors when showErrors = true and errors is not empty', () => {
    const state = {
      ...STATE,
      errors: ['Error 1', 'Error 2']
    }

    const data = () => ({ showErrors: true })
    const wrapper = render({ data }, { state })

    expect(snackbars(wrapper).at(0).text()).toEqual('Error 1')
    expect(snackbars(wrapper).at(0).attributes().style).toContain('margin-bottom: 0px;')
    expect(snackbars(wrapper).at(0).props().color).toEqual('error')

    expect(snackbars(wrapper).at(1).text()).toEqual('Error 2')
    expect(snackbars(wrapper).at(1).attributes().style).toContain('margin-bottom: 60px;')
    expect(snackbars(wrapper).at(1).props().color).toEqual('error')
  })

  it('shows the success snackbar if showSuccess = true and success is not blank', () => {
    const state = {
      ...STATE,
      success: 'Success!'
    }

    const data = () => ({ showSuccess: true })
    const wrapper = render({ data }, { state })

    expect(snackbars(wrapper).at(0).text()).toEqual('Success!')
    expect(snackbars(wrapper).at(0).props().color).toEqual('success')
  })
})
