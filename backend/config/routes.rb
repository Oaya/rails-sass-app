Rails.application.routes.draw do
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

    get "me", to: "users#me"
    get "plans", to: "plans#index"
    post "users/confirm_signin", to: "users/confirmations#confirm_signin"
    patch "users/password", to: "users/passwords#update"
  end
end
