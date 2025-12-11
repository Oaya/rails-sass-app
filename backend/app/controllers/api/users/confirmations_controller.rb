module Api
  module Users
    class ConfirmationsController < ApplicationController
      # This is not a Devise controller, so we skip auth
      skip_before_action :authenticate_user!, :set_current_user_and_tenant
      respond_to :json

    
      def confirm_signin
        token = params[:confirmation_token].to_s

        if token.blank?
          return render_error("Confirmation token is required", :bad_request)
        end

        # Confirm the user by token
        user = User.confirm_by_token(token)


        if user.errors.any?
          return render_error(user.errors.full_messages.join(", "), :unprocessable_entity)
        end

        # At this point the user is confirmed.
        # Sign them in so devise-jwt can issue a JWT.
        sign_in(user)

        # devise-jwt stores the token after sign_in
        jwt = request.env["warden-jwt_auth.token"]

        unless jwt
          # Fallback in case JWT was not generated for some reason
          return render_error("Could not generate authentication token", :internal_server_error)
        end

        render json: {
          message: "Email confirmed and signed in successfully",
          token: jwt,
          user: {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            is_admin: user.is_admin,
            tenant: user.tenant && {
              id: user.tenant.id,
              name: user.tenant.name,
              plan: user.tenant.plan&.name
            }
          }
        }, status: :ok
      end
    end
  end
end
