require 'rails_helper'

RSpec.describe TweetFetcher, vcr: true do
  it 'fetches the tweet and subs in the supplied name' do
    phrase = 'Weak on illegal immigration'
    name = 'foo'

    outcome = described_class.run(name: name, phrase: phrase)

    expect(outcome.result).not_to match(outcome.send('substitute_hash')[phrase])
    expect(outcome.result).to include(name)
  end

  it 'throws an error if no name is provided' do
    outcome = described_class.run(name: '')

    expect(outcome.errors.full_messages).to include("Name can't be blank")
  end

  it 'throws an error if the phrase entered is invalid' do
    outcome = described_class.run(name: 'foo', phrase: 'bar')

    expect(outcome.errors.full_messages).to include("Phrase is invalid")
  end
end
