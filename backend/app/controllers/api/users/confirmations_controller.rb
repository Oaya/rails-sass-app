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
        payload = SignInWithJwt.new(self).issue_jwt(
          user,
          message: "Email confirmed and signed in successfully",
        )

        render json: payload, status: :ok
      rescue => e
        render_error(e.message, :internal_server_error)
      end
    end
  end
end

