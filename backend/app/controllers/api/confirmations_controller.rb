# app/controllers/api/confirmations_controller.rb
module Api
  class ConfirmationsController < Devise::ConfirmationsController
    # If you want JSON only, you can add:
    respond_to :json

    def show
      self.resource = resource_class.confirm_by_token(params[:confirmation_token])

      if resource.errors.empty?
        render json: { message: "Email confirmed successfully." }, status: :ok
      else
        render json: { error: resource.errors.full_messages.join(", ") },
               status: :unprocessable_entity
      end
    end
  end
end
