require 'rails_helper'

RSpec.describe 'Tweets' do
  describe '#create' do
    context 'when valid' do
      it 'creates a tweet and responds with the success message' do
        allow_to_run(::TweetGenerator, fail: false)
        post api_v1_tweets_path, params: { tweet: { name: 'foo' } }

        expect(JSON.parse(response.body)['success']).to include(
          'Your tweet has been successfully created and will appear in the timeline above momentarily.',
        )
      end
    end

    context 'when there is an error' do
      it 'repsonds with an error message' do
        allow_to_run(::TweetGenerator, fail: true)
        post api_v1_tweets_path, params: { tweet: { name: '' } }

        expect(JSON.parse(response.body)['error']).to include('base' => ['forced test failure'])
      end
    end
  end
end
