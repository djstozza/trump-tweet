class Api::V1::TweetsController < ::ApplicationController
  def create
    outcome = TweetGenerator.run(name: permitted_params[:name])

    if outcome.valid?
      render json: {
        success: 'Your tweet has been successfully created and will appear in the timeline above momentarily.',
      }
    else
      render json: { error: outcome.errors }, status: :unprocessable_entity
    end
  end

  def permitted_params
    params.require(:tweet).permit(:name)
  end
end
