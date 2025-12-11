module Api
  class PlansController < ApplicationController
  skip_before_action :authenticate_user!, :set_current_user_and_tenant, only: [:index]

    def index
      plans = Plan.all
      render json: plans, status: :ok
    rescue
      render_error("Unable to fetch plans", :internal_server_error)
    end
  end
end