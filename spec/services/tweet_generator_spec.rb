require 'rails_helper'

RSpec.describe TweetGenerator, vcr: true do
  it 'creates a tweet' do
    tweet_result = 'foo bar'

    expect_to_execute(
      ::TweetFetcher,
      with: { name: 'foo' },
      return: tweet_result
    )
    result = described_class.run!(name: 'foo')

    expect(result.is_a?(Twitter::Tweet)).to be_truthy
    expect(result.text).to eq(tweet_result)
  end

  it 'throws an error if invalid' do
    allow_to_run(::TweetFetcher, fail: true)

    outcome = described_class.run(name: 'foo')

    expect(outcome.errors.full_messages).to include('forced test failure')
  end
end
