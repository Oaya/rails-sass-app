module Api
  module Users
    class SessionsController < Devise::SessionsController
      respond_to :json

      def create
        email    = params.dig(:user, :email)&.downcase
        password = params.dig(:user, :password)

        return render_error("Email and password are required", :unprocessable_entity) unless email.present? && password.present?

        user = User.find_for_database_authentication(email: email)

        if user&.valid_password?(password)
          payload = SignInWithJwt.new(self).issue_jwt(
            user,
            scope: resource_name,
            message: "Successfully Logged in"
          )

          render json: payload, status: :ok
        else
          render_error("Invalid email or password", :unauthorized)
        end
      rescue => e
        render_error(e.message, :internal_server_error)
      end

    end
  end
end
