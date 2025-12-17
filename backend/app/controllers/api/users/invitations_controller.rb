module Api
  module Users
    class InvitationsController < Devise::InvitationsController
      respond_to :json
      wrap_parameters false

      before_action :authenticate_api_user!, only: [:create]
      before_action :ensure_admin!, only: [:create]

      def update
        self.resource = accept_resource

        if resource.errors.empty?
          payload = SignInWithJWT.new(self).issue_jwt(
            resource,
            scope: resource_name,
            message: "Created your new password"  
          )

          render json: payload, status: :ok
        else
          render_error(resource.errors.full_messages.join(", "), :unprocessable_entity)
        end
      rescue => e
        render_error(e.message, :internal_server_error)
      end



      private

      def ensure_admin!
        unless current_api_user&.is_admin?
          render json: { error: "Forbidden" }, status: :forbidden
          return
        end
      end

      def invite_params
        params.require(:user).permit(:email, :first_name, :last_name, :tenant_id)
      end

      def update_resource_params
        params.require(:user).permit(:invitation_token, :password, :password_confirmation)
      end
    end
  end
end
