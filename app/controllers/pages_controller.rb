class PagesController < ApplicationController
  def root
    @tweet_options = ::TweetFetcher.new.tweet_options
  end
end
