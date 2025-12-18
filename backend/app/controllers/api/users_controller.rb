module Api
  class UsersController < ApplicationController

    def me
      user = Current.user
      return render_error("Unauthorized", :unauthorized) unless user

      render json: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          is_admin: user.is_admin,
          tenant_id: user.tenant&.id,
          tenant_name: user.tenant&.name,
          plan: user.tenant&.plan&.name
        }
      }, status: :ok
    end
  end
end
