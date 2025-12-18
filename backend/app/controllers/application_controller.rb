class ApplicationController < ActionController::API
  # JSON-only API
  include ActionController::MimeResponds
  respond_to :json

  before_action :authenticate_user!, unless: :devise_controller?
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_current_user_tenant_plan, unless: :devise_controller?

  rescue_from ActiveRecord::RecordNotFound do
    render_error("Not found", :not_found)
  end

  rescue_from Net::SMTPUnknownError do |e|
    Rails.logger.error("SMTP error: #{e.message}")
    render_error(
      "We’re currently unable to send emails. Please try again later.",
      :service_unavailable
    )
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name ])

    devise_parameter_sanitizer.permit(
      :invite,
      keys: [ :email, :first_name, :last_name, :tenant_id ]
    )

    devise_parameter_sanitizer.permit(
      :accept_invitation,
      keys: [ :invitation_token, :password, :password_confirmation ]
    )
  end

  private


  # Devise → user model, password, confirmations, invitations
  # devise-jwt → issues JWT tokens
  # Warden → actually authenticates each request

  # API only app, devise helper methods (current_user, authenticate_user!) are not guaranteed to used into controllers.
  # and we need to implement by own with Warden.

  # Find warden, warden is middleware and "warden-jwt-auth" run before controller. it reads "Authentication" header ,decode JWT, and load user
  def warden
    request.env["warden"]
  end

  # Check devise scope make sure match.
  def devise_scope
    Devise.mappings.keys.first
  end

  # create authenticate_user! helper method. use warden.authenticate! to decodes the token and verifies signature and expiration
  # valid JWT -> user is set and request continue otherwise rise error
  def authenticate_user!
    warden.authenticate!(scope: devise_scope)
  rescue Warden::NotAuthenticated
    render_error("Unauthorized", :unauthorized)
  end

  # after authenticate_user! it set the current_user
  def current_user
    warden.user(devise_scope)
  end

  def set_current_user_tenant_plan
    Current.user = current_user
    Current.tenant = current_user&.tenant
    Current.plan = current_user&.tenant.plan
  end

  def render_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end
end
