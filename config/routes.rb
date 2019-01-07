Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :pages, only: [:root]

  namespace :api do
    namespace :v1 do
      resource :tweets, only: [:create]
    end
  end
  root to: "pages#root"
end
