
module Api
  class PaymentsController < ApplicationController
    skip_before_action :authenticate_user!, :set_current_user_tenant_plan, only: [:checkout]

    def checkout
      Stripe.api_key = Rails.application.credentials.dig(:stripe, :secret_key)


      pp params(:email)
      pp params
      plan_name = params.require(:plan)
      plan = Plan.find_by!(name: plan_name)

      # # Create or reuse a stripe customer by email
      # customers = Stripe::Customer.list(email: params.require(:email), limit: 1).data
      # customer = customers.first || Stripe::Customer.create(
      #   email: params.requre
      # )


      frontend = Rails.application.credentials[:frontend_url] || "http://localhost:5173"


      # Put signup info into metadata so you can create the user after payment
      session = Stripe::Checkout::Session.create(
        ui_mode: "custom",
        mode: "subscription",
        line_items: [{ price: plan.stripe_price_id, quantity: 1 }],
        return_url: "#{frontend}/signup/return?session_id={CHECKOUT_SESSION_ID}",
        metadata: {
          email: params[:email],
          first_name: params[:first_name],
          last_name: params[:last_name],
          tenant: params[:tenant],
          plan: plan
        }
      )

      render json: { client_secret: session.client_secret }, status: :ok
    end
  end
end
