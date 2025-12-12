module Api
  class ConfirmationsController < Devise::ConfirmationsController
    respond_to :json

    # This is api when click confirm account email and redirect to frontend confirm email page.
    def show
      token = params[:confirmation_token]
      frontend_base = Rails.application.credentials.frontend_url

      # just redirect; don't consume the token
      redirect_to "#{frontend_base}/email-confirmed?confirmation_token=#{token}"
    end
  end
end
