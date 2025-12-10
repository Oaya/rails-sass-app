Rails.application.routes.draw do


  # API routes
  namespace :api do
      # Devise routes for JSON API
      devise_for :users,
             path: "",
             defaults: { format: :json },
             controllers: {
              sessions: "api/users/sessions",
              registrations: "api/users/registrations"
             }
  end
end
