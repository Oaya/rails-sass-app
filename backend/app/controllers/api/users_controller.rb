module Api
  class UsersController < ApplicationController

    def me
      user = current_user

      render json: {
        user: {
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          is_admin: user.is_admin,
          tenant_id: user.tenant&.id,
          plan: user.tenant&.plan&.name
        }
      }, status: :ok
    end
  end
end
