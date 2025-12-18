module Api
  module Users
    class InvitationsController < Devise::InvitationsController
      respond_to :json
      wrap_parameters false

      before_action :authenticate_user!, :ensure_admin!, :check_member_limit, only: [:create]


      def update
        self.resource = accept_resource

        if resource.errors.empty?
          payload = SignInWithJwt.new(self).issue_jwt(
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
        render_error("forbidden", :forbidden) unless current_user&.is_admin
      end

      def check_member_limit
        tenant = current_user&.tenant

        limit = tenant.plan.features&.fetch("member", nil)

        return if limit == "unlimited"
        member_limit = limit.to_i
        
        current_members = tenant.users.count

        if current_members >= member_limit
          render_error("You have reached member limit", :unprocessable_entity)
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
