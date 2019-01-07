class Api::V1::TweetsController < ::ApplicationController
  def create
    outcome = TweetGenerator.run(name: permitted_params[:name])

    if outcome.valid?
      render json: { result: outcome.result }
    else
      render json: { error: outcome.errors }, status: :unprocessable_entity
    end
  end

  def permitted_params
    params.require(:tweet).permit(:name)
  end
end
