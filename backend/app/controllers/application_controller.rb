class ApplicationController < ActionController::API
  # Everything response should be JSON
  include ActionController::MimeResponds
  respond_to :json

  # Require a logged-in user for everything except Devise controllers
  before_action :authenticate_user!, unless: :devise_controller?
  # Allow extra Devise parameters
  before_action :configure_permitted_parameters, if: :devise_controller?
  # Set pre request globals
  before_action :set_current_user_and_account

  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found

  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name, :tenant, :plan ])
  end



  private

  def set_current_user_and_account
    Current.user = current_user
    Current.account = current_user&.account
  end

  def render_not_found
    render json: { error: "Not found" }, status: :not_found
  end
end
