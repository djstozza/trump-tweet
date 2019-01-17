require 'httparty'

class TweetFetcher < ApplicationInteraction
  include HTTParty
  include Nokogiri

  string :name
  string :phrase, default: nil

  validates :name, presence: true
  validate :valid_phrase

  def execute
    nokogiri_page = Nokogiri::HTML(twitter_response(substr))
    nokogiri_page.css('.tweet-text').to_a.sample.text.gsub('@', '').gsub(substitute_hash[substr], name)
  end

  def tweet_options
    substitute_hash.keys.sort
  end

  private

  def substr
    @substr ||= phrase ? phrase : substitute_hash.keys.sample
  end

  def valid_phrase
    return if phrase.blank?
    return if tweet_options.include?(phrase)

    errors.add(:phrase, 'is invalid')
  end

  def twitter_response(str)
    HTTParty.get("https://twitter.com/search?f=tweets&q=from%3Arealdonaldtrump%20#{str}")
  end

  def substitute_hash
    {
      "Barack Obama" => /\bbar(r){0,1}ack{0,1}[\s]{0,1}(obama){0,1}/i,
      "Crooked Hillary" => /\bhillary{0,1}([\s]{0,1}(clinton)){0,1}/i,
      "Lyin' Ted" => /\bted([\s]{0,1}(cruz)){0,1}|cruz/i,
      "CNN" => /cnn/i,
      "Lord Sugar" => /\b(lord{0,1}(\s|\_){0,1}){0,1}sugar|lord/i,
      "Low energy Jeb" => /\bjeb{0,1}([\s]{0,1}(bush)){0,1}/i,
      "Lightweight Marco" => /\bmarco{0,1}([\s]{0,1}rubio){0,1}/i,
      "Fake news the enemy of the people" => /\b(the\s){0,1}fake\snews(\smedia){0,1}/i,
      "Weak on illegal immigration" => %r{
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
