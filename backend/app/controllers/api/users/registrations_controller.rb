module Api
  module Users
    class RegistrationsController < Devise::RegistrationsController
      respond_to :json

      def create
        email = sign_up_params[:email].to_s.downcase

        # check the user exists or not with the email
        exists_user = User.find_by(email: email)

        print exists_user

        if exists_user
          if exists_user.confirmed?
            render_error("Cannot register this email", :unprocessable_entity)
          else
            exists_user.send_confirmation_instructions
            render json: { message: "We sent the confirmation email" },
                   status: :ok
          end
          return
        end

        service = SignUpWithTenant.new(
          sign_up_params.merge(email: email),
          tenant_params
        )

        if service.call
          render json: {
            message: "Signed up successfully, please check your email to confirm your account"
          }, status: :created
        else
          render_error(service.error_message, :unprocessable_entity)
          render json: { error: service.error_message },
                 status: :unprocessable_entity
        end
      end

      private

      def sign_up_params
        params.require(:user).permit(
          :email,
          :password,
          :password_confirmation,
          :first_name,
          :last_name
        )
      end
      
      def tenant_params
        params.require(:tenant).permit(:name, :plan)
      end
    end
  end
end
