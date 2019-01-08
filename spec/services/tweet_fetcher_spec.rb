require 'rails_helper'

RSpec.describe TweetFetcher, vcr: true do
  it 'fetches the tweet and subs in the supplied name' do
    substr = 'weak on illegal immigration'
    name = 'foo'

    allow_any_instance_of(TweetFetcher).to receive('substr').and_return(substr)

    outcome = described_class.run(name: name)

    expect(outcome.result).not_to match(outcome.send('substitute_hash')[substr])
    expect(outcome.result).to include(name)
  end

  it 'throws an error if no name is provided' do
    outcome = described_class.run(name: '')

    expect(outcome.errors.full_messages).to include("Name can't be blank")
  end
end
