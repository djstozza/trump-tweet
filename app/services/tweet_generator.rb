require 'httparty'

class TweetGenerator < ApplicationInteraction
  include HTTParty
  include Nokogiri

  string :name

  def execute
    key = substitute_hash.keys.sample
    repsonse = HTTParty.get("https://twitter.com/search?f=tweets&q=from%3Arealdonaldtrump%20#{key}")
    nokogiri_page = Nokogiri::HTML(repsonse)

    nokogiri_page.css('.tweet-text').to_a.sample.text.gsub(substitute_hash[key], name.humanize)
  end

  private

  def substitute_hash
    {
      'barack%20obama' => /\bbar(r){0,1}ack{0,1}\s{0,1}(obama){0,1}/i,
      'crooked%20hillary' => /\bhillary{0,1}(\s{0,1}(clinton)){0,1}/i,
      "lyin'%20ted" => /\bted{0,1}(\s{0,1}(cruz)){0,1}/i,
      'cnn' => /cnn/i,
      'obamacare' => /obama/i,
      'lord%20sugar' => /\b(lord{0,1}(\s|\_){0,1}){0,1}sugar|lord/i,
      'low%20energy%20jeb' => /\bjeb{0,1}(\s{0,1}(bush)){0,1}/i,
      'lightweight%20marco' => /\bmarco{0,1}(\s{0,1}rubio){0,1}/i,
    }
  end
end
