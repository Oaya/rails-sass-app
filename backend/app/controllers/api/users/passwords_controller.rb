module Api
  module Users
    class PasswordsController < Devise::PasswordsController
      respond_to :json

      def create
        email = resource_params[:email].to_s.downcase

        if email.blank? 
          return render json: {error: "Email is required"}, status: :unprocessable_entity
        end

        self.resource = resource_class.send_reset_password_instructions(resource_params)

        # For security, don't reveal whether the email exists
        if successfully_sent?(resource)
          render json: {
            message: "If that email exists in our system, you will receive password reset instructions shortly."}, status: :ok
        else
          # Usually validation errors such as invalid email format
          render json: { error: resource.errors.full_messages.join(" ") }, status: :unprocessable_entity
        end
      end

      private

       def resource_params
         params.require(:user).permit(:email)
       end
    end
  end
end
