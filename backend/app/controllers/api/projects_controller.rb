module Api
  class ProjectsController < ApplicationController
    before_action :check_is_admin, only: [ :create ]

    def index
      projects = Current.tenant.projects
      pp projects

      render json: projects, status: :ok
    end


    def create
      # check the tenant's plan. if it's over the features project_number then we can't create.
      # get the current tenant project number first
      limit = Current.plan.features["project_number"]
      count =  Current.tenant.projects_count


      if  limit == "unlimited" ||  count < limit.to_i
        project = Current.tenant.projects.build(project_params)

        if project.save
          head :created

        else
          render_error(project.errors.full_messages.join(", "),  :unprocessable_entity)
        end

      else
        render_error("You have reached project limit", :unprocessable_entity)
      end
    end


    private

    def project_params
      params.require(:project).permit(:title, :details, :expected_completion_date)
    end


    def check_is_admin
      render_error("No access to the action", :forbidden) unless Current.user&.is_admin
    end
  end
end
