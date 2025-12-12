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
          render json: {
            message: "If that email exists in our system, you will receive password reset instructions shortly." }, status: :ok
        else
          # Usually validation errors such as invalid email format
          render_error(resource.errors.full_messages.join(", "), :unprocessable_entity)
        end
      end

      def edit 
        token = params[:reset_password_token]
        frontend_base = Rails.application.credentials.frontend_url
        redirect_to "#{frontend_base}/reset-password?reset_password_token=#{token}"
      end

      private

       def resource_params
         params.require(:user).permit(:email)
       end
    end




  end
end
