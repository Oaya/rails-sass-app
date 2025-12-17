module Api
  module Users
    class PasswordsController < Devise::PasswordsController
      respond_to :json

      def create
        email = resource_params[:email].to_s.downcase

        if email.blank? 
          return render_error("Email is required", :unprocessable_entity)
        end

        self.resource = resource_class.send_reset_password_instructions(resource_params)

        # For security, don't reveal whether the email exists
        if successfully_sent?(resource)
          render status: :ok
        else
          # Usually validation errors such as invalid email format
          render_error(resource.errors.full_messages.join(", "), :unprocessable_entity)
        end
      end

      # This is api when click the Change my password in the email and redirect to frontend reset password page.
      def edit
        token = params[:reset_password_token]
        frontend_base = Rails.application.credentials.frontend_url

        # just redirect don't consume the token so that we can use on the frontend.
        redirect_to "#{frontend_base}/reset-password?reset_password_token=#{token}"
      end

      # This api is actually update the user's password
      def update
        token = update_params[:reset_password_token]

        if token.blank?
          return render_error("Reset token is required", :bad_request)
        end

        user = User.reset_password_by_token(update_params)
        puts user

        if user.errors.any?
          return render_error(user.errors.full_messages.join(", "), :unprocessable_entity)
        end

        payload = SignInWithJWT.new(self).issue_jwt(
          user,
          message: "Password was changed successfully"
        )

        render json: payload, status: :ok
        
      rescue => e
        render_error(e.message, :internal_server_error)  

      end

      private

       def resource_params
         params.require(:user).permit(:email)
       end

       def update_params
         params.require(:user).permit(:reset_password_token, :password, :password_confirmation)
       end
    end
  end
end
