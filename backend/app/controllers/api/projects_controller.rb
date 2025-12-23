module Api
  class ProjectsController < ApplicationController
    before_action :check_is_admin, only: [ :create ]

    def index
      projects = Current.tenant.projects.includes(:created_by)

      render json: projects.as_json(
        include: {
          created_by: { only: [ :first_name, :last_name ] }
        }
      ), status: :ok
    end

    # GET /api/projects/:id
    def show
      pp params
      project = Current.tenant.projects.includes(:resources).find(params[:id])

      render json: project, include: :resources
    end


    def create
      # check the tenant's plan. if it's over the features project_number then we can't create.
      # get the current tenant project number first
      limit = Current.plan.features["project_number"]
      count =  Current.tenant.projects_count


      if  limit == "unlimited" ||  count < limit.to_i
        project = Current.tenant.projects.build(project_params)
        project.created_by = Current.user

        if project.save

        render json: project.as_json(
          include: {
            created_by: { only: [ :first_name, :last_name ] }
          }
        ), status: :ok


        else
          render_error(project.errors.full_messages.join(", "),  :unprocessable_entity)
        end

      else
        render_error("You have reached project limit", :unprocessable_entity)
      end
    end

    # User that same tenant with the project can update
    def update
      pp project_params
      project = Current.tenant.projects.find(params[:id])

      if project.update(project_params)
        project = Project.includes(:created_by).find(project.id)

        render json: project.as_json(
          include: { created_by: { only: [ :first_name, :last_name ] } }
        ), status: :ok
      else
        render_error(project.errors.full_messages.join(", "), :unprocessable_entity)
      end
    end

    def destroy
      project = Current.tenant.projects.find(params[:id])


      if project.destroy
        render json: { message: "Project was deleted" }, status: :ok
      else
        render json: {
          error: project.errors.full_messages.join(" ")
        }, status: :unprocessable_entity
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
