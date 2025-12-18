module Api
  class PlansController < ApplicationController
  skip_before_action :authenticate_user!, :set_current_user_tenant_plan, only: [:index]

    def index
      plans = Plan.all

      pp plans
      render json: plans, status: :ok
    rescue
      render_error("Unable to fetch plans", :internal_server_error)
    end
  end
end