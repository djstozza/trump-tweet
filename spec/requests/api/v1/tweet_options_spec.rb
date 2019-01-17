require 'rails_helper'

RSpec.describe 'TweetsOptions' do
  describe '#index' do
    it 'fetches all the available tweet options and sorts them' do
      get api_v1_tweet_options_path

      expect(JSON.parse(response.body)['tweet_options']).to eq(TweetFetcher.new.tweet_options)
    end
  end
end
