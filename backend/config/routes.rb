Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'

  namespace :api do
    devise_for :users,
      defaults: { format: :json },
      controllers: {
        sessions: "api/users/sessions",
        registrations: "api/users/registrations",
        confirmations: "api/confirmations",
        passwords: "api/users/passwords",
        invitations: "api/users/invitations"
      }

    resources :projects, only: [:create, :index, :show, :update, :destroy] do
      resources :resources, only: [:create, :index]
    end

    resources :resources, only: [:show, :destroy] do
      member do
        post :complete
        get  :download_url
      end
    end


    get "me", to: "users#me"
    get "plans", to: "plans#index"
    post "users/confirm_signin", to: "users/confirmations#confirm_signin"
    patch "users/password", to: "users/passwords#update"
    post "payments/checkout", to: "payments#checkout"

  end
end
