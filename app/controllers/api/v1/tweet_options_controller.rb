class Api::V1::TweetOptionsController < ::ApplicationController
  def index
    render json: { tweet_options: TweetFetcher.new.tweet_options }
  end
end
