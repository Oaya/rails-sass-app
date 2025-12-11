module Api
  module Users
    class SessionsController < Devise::SessionsController
      respond_to :json

      def create
        email    = params.dig(:user, :email)&.downcase
        password = params.dig(:user, :password)

        unless email.present? && password.present?

          return render_error("Email and password are required", :unprocessable_entity)
        end

        user = User.find_for_database_authentication(email: email)

        if user&.valid_password?(password)
          sign_in(resource_name, user)  # devise-jwt hooks here

          render json: {
            user: {
              id: user.id,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              is_admin: user.is_admin,
              tenant: user.tenant ? {
                id: user.tenant.id,
                plan: user.tenant.plan ? user.tenant.plan.name : nil
              } : nil
            }
          }, status: :ok
        else
          render_error("Invalid email or password", :unauthorized) 
        end
      end
    end
  end
end
