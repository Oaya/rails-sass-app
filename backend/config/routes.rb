Rails.application.routes.draw do
  # API routes
  namespace :api do
      # Devise routes for JSON API
      devise_for :users,
             defaults: { format: :json },
             controllers: {
              sessions: "api/users/sessions",
              registrations: "api/users/registrations",
              confirmations: "api/confirmations",
              passwords: "api/users/passwords"
            }

      get "plans", to: "plans#index"
      post "users/confirm_signin", to: "users/confirmations#confirm_signin"
  end
end
