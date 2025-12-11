module Api
  class ConfirmationsController < Devise::ConfirmationsController
    respond_to :json

    def show
      frontend_base = Rails.application.credentials.frontend_url
      token = params[:confirmation_token]

      # just redirect; don't consume the token
      redirect_to "#{frontend_base}/email-confirmed?confirmation_token=#{token}"
    end
  end
end