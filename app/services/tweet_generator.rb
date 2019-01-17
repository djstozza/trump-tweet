require 'httparty'

class TweetGenerator < ApplicationInteraction
  include Twitter

  string :name
  string :phrase, default: nil

  def execute
    outcome = ::TweetFetcher.run(name: name, phrase: phrase)
    errors.merge!(outcome.errors)
    halt_if_errors!

    twitter_client.update(outcome.result)
  rescue Twitter::Error::Forbidden
    retry
  end

  private

  def twitter_client
    Twitter::REST::Client.new do |config|
      config.consumer_key = ENV["TWITTER_KEY"]
      config.consumer_secret = ENV["TWITTER_SECRET"]
      config.access_token = ENV["TWITTER_ACCESS_TOKEN"]
      config.access_token_secret = ENV["TWITTER_ACCESS_TOKEN_SECRET"]
    end
  end
end
