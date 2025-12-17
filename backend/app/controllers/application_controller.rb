class ApplicationController < ActionController::API
  # Everything response should be JSON
  include ActionController::MimeResponds
  include ActionController::Redirecting
  include Devise::Controllers::Helpers
  include Devise::Controllers::SignInOut
  respond_to :json


  # Require a logged-in user for everything except Devise controllers
  before_action :authenticate_user!, unless: :devise_controller?
  # Allow extra Devise parameters
  before_action :configure_permitted_parameters, if: :devise_controller?
  # Set pre request globals
  before_action :set_current_user_and_tenant, unless: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound do
    render_error("Not found", :not_found)
  end

  rescue_from Net::SMTPUnknownError do |e|
    Rails.logger.error("SMTP error: #{e.message}")
    # You can tweak this message however you like
    render_error(
      "We’re currently unable to send confirmation emails. Please try again in a moment.",
      :service_unavailable
    )
  end


  protected
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])

    devise_parameter_sanitizer.permit(
      :invite,
      keys: [:email, :first_name, :last_name, :tenant_id]
    )

    devise_parameter_sanitizer.permit(
      :accept_invitation,
      keys: [:invitation_token, :password, :password_confirmation]
    )
  end

  private

  def set_current_user_and_tenant
    Current.user = current_user
    Current.account = current_user&.tenant
  end

  def render_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end

end
