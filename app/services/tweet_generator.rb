require 'httparty'

class TweetGenerator < ApplicationInteraction
  include HTTParty
  include Nokogiri

  string :name

  validates :name, presence: true

  def execute
    twitter_client.update(tweet)
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

  def tweet
    key = substitute_hash.keys.sample
    repsonse = HTTParty.get("https://twitter.com/search?f=tweets&q=from%3Arealdonaldtrump%20#{key}")
    nokogiri_page = Nokogiri::HTML(repsonse)

    nokogiri_page.css('.tweet-text').to_a.sample.text.gsub('@', '').gsub(substitute_hash[key], name)
  end

  def substitute_hash
    {
      "barack obama" => /\bbar(r){0,1}ack{0,1}[\s]{0,1}(obama){0,1}/i,
      "crooked hillary" => /\bhillary{0,1}([\s]{0,1}(clinton)){0,1}/i,
      "lyin' ted" => /\bted([\s]{0,1}(cruz)){0,1}|cruz/i,
      "cnn" => /cnn/i,
      "lord sugar" => /\b(lord{0,1}(\s|\_){0,1}){0,1}sugar|lord/i,
      "low energy jeb" => /\bjeb{0,1}([\s]{0,1}(bush)){0,1}/i,
      "lightweight marco" => /\bmarco{0,1}([\s]{0,1}rubio){0,1}/i,
      "weak on illegal immigration" => %r{
        \bted{0,1}([\s]{0,1}(cruz)){0,1}|
        \bmarco{0,1}([\s]{0,1}(rub){0,1}io){0,1}|
        \bjeb{0,1}([\s]{0,1}(bush)){0,1}|
        \bhillary{0,1}([\s]{0,1}(clinton)){0,1}|
        \bben([\s]{0,1}carson){0,1}|
        rubio|
        kasich|
        jo(h){0,1}n\sossoff|
        (doug[\s]{0,1}){0,1}jones
      }ix
    }
  end
end
