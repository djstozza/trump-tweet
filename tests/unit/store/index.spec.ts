import { initialState, mutations, tweetPhraseOptions } from '@/store'

const {
  setSelectedPhrase,
  setName,
  setErrors,
  setSuccess,
  socketBroadcastTweet
} = mutations

describe('store', () => {
  describe('mutations', () => {
    describe('setName', () => {
      it('sets the name', () => {
        setName(initialState, 'Foo')
        expect(initialState.name).toEqual('Foo')
      })
    })

    describe('setSelectedPhrase', () => {
      it('sets the selectedPhrase', () => {
        setSelectedPhrase(initialState, tweetPhraseOptions[0])
        expect(initialState.selectedPhrase).toEqual(tweetPhraseOptions[0])

        setSelectedPhrase(initialState, undefined)
        expect(initialState.selectedPhrase).toEqual(undefined)
      })
    })

    describe('setErrors', () => {
      it('sets the errors', () => {
        setErrors(initialState, ['Error 1', 'Error 2'])
        expect(initialState.errors).toEqual(['Error 1', 'Error 2'])
      })
    })

    describe('setSuccess', () => {
      it('sets the success message', () => {
        setSuccess(initialState, 'Success!')
        expect(initialState.success).toEqual('Success!')
      })
    })

    describe('socketBroadcastTweet', () => {
      it('sets the latestTweetId', () => {
        socketBroadcastTweet(initialState, '123')
        expect(initialState.latestTweetId).toEqual('123')
      })
    })
  })
})
