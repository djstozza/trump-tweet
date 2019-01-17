Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :pages, only: [:root]

  namespace :api do
    namespace :v1 do
      resources :tweets, only: [:create]
      resources :tweet_options, only: [:index]
    end
  end
  root to: "pages#root"
end
