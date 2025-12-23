# frozen_string_literal: true

require "swagger_helper"

RSpec.describe "API Routes (skeleton)", type: :request do
  # Auto-generated from `bin/rails routes`.
  # TODO: Add auth (securitySchemes), request/response schemas, and correct status codes.

  # api/confirmations
  path "/api/users/confirmation" do
    get "Api Confirmations#show" do
      tags "Api Confirmations"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end

  # api/payments
  path "/api/payments/checkout" do
    post "Api Payments#checkout" do
      tags "Api Payments"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "201", "auto" do
        run_test!
      end
    end
  end


  # api/plans
  path "/api/plans" do
    get "Api Plans#index" do
      tags "Api Plans"
      produces "application/json"

      response "200", "ok" do
        schema "$ref" => "#/components/schemas/PlansResponse"
        run_test!
      end
    end
  end


  # api/projects
  path "/api/projects" do
    get "Api Projects#index" do
      tags "Api Projects"
      produces "application/json"

      response "200", "ok" do
        schema "$ref" => "#/components/schemas/ProjectsResponse"
        run_test!
      end
    end
  end

  path "/api/projects/{id}" do
    parameter name: :id, in: :path, type: :string, description: "id"

    get "Api Projects#show" do
      tags "Api Projects"
      produces "application/json"

      response "200", "auto" do
        let(:id) { "TODO" }
        run_test!
      end
    end
  end

  path "/api/projects" do
    post "Api Projects#create" do
      tags "Api Projects"
      produces "application/json"
      consumes "application/json"

      parameter name: :payload, in: :body, schema: {
        "$ref" => "#/components/schemas/ProjectUpdateRequest"
      }

      response "201", "auto" do
        run_test!
      end
    end
  end

  path "/api/projects/{id}" do
    parameter name: :id, in: :path, type: :string, description: "id"

    patch "Api Projects#update" do
      tags "Api Projects"
      produces "application/json"
      consumes "application/json"

      parameter name: :payload, in: :body, schema: {
        "$ref" => "#/components/schemas/ProjectCreateRequest"
      }

      response "200", "auto" do
        let(:id) { "TODO" }
        run_test!
      end
    end
  end

  path "/api/projects/{id}" do
    parameter name: :id, in: :path, type: :string, description: "id"

    delete "Api Projects#destroy" do
      tags "Api Projects"
      produces "application/json"

      response "204", "auto" do
        let(:id) { "TODO" }
        run_test!
      end
    end
  end


  # api/resources
  path "/api/projects/{project_id}/resources" do
    parameter name: :project_id, in: :path, type: :string, description: "project_id"

    get "Api Resources#index" do
      tags "Api Resources"
      produces "application/json"

      response "200", "auto" do
        let(:project_id) { "TODO" }
        run_test!
      end
    end
  end

  path "/api/projects/{project_id}/resources" do
    parameter name: :project_id, in: :path, type: :string, description: "project_id"

    post "Api Resources#create" do
      tags "Api Resources"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "201", "auto" do
        let(:project_id) { "TODO" }
        run_test!
      end
    end
  end

  path "/api/resources/{id}" do
    parameter name: :id, in: :path, type: :string, description: "id"

    delete "Api Resources#destroy" do
      tags "Api Resources"
      produces "application/json"

      response "204", "auto" do
        let(:id) { "TODO" }
        run_test!
      end
    end
  end

  path "/api/resources/{id}" do
    parameter name: :id, in: :path, type: :string, description: "id"

    get "Api Resources#show" do
      tags "Api Resources"
      produces "application/json"

      response "200", "auto" do
        let(:id) { "TODO" }
        run_test!
      end
    end
  end

  path "/api/resources/{id}/complete" do
    parameter name: :id, in: :path, type: :string, description: "id"

    post "Api Resources#complete" do
      tags "Api Resources"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "201", "auto" do
        let(:id) { "TODO" }
        run_test!
      end
    end
  end

  path "/api/resources/{id}/download_url" do
    parameter name: :id, in: :path, type: :string, description: "id"

    get "Api Resources#download_url" do
      tags "Api Resources"
      produces "application/json"

      response "200", "auto" do
        let(:id) { "TODO" }
        run_test!
      end
    end
  end


  # api/users
  path "/api/me" do
    get "Api Users#me" do
      tags "Api Users"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end


  # api/users/confirmations
  path "/api/users/confirm_signin" do
    post "Api Users Confirmations#confirm_signin" do
      tags "Api Users Confirmations"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "201", "auto" do
        run_test!
      end
    end
  end


  # api/users/invitations
  path "/api/users/invitation" do
    patch "Api Users Invitations#update" do
      tags "Api Users Invitations"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/invitation" do
    post "Api Users Invitations#create" do
      tags "Api Users Invitations"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "201", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/invitation" do
    put "Api Users Invitations#update" do
      tags "Api Users Invitations"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/invitation/accept" do
    get "Api Users Invitations#edit" do
      tags "Api Users Invitations"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/invitation/new" do
    get "Api Users Invitations#new" do
      tags "Api Users Invitations"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/invitation/remove" do
    get "Api Users Invitations#destroy" do
      tags "Api Users Invitations"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end


  # api/users/passwords
  path "/api/users/password" do
    patch "Api Users Passwords#update" do
      tags "Api Users Passwords"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/password" do
    patch "Api Users Passwords#update" do
      tags "Api Users Passwords"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/password" do
    post "Api Users Passwords#create" do
      tags "Api Users Passwords"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "201", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/password" do
    put "Api Users Passwords#update" do
      tags "Api Users Passwords"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/password/edit" do
    get "Api Users Passwords#edit" do
      tags "Api Users Passwords"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/password/new" do
    get "Api Users Passwords#new" do
      tags "Api Users Passwords"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end


  # api/users/registrations
  path "/api/users" do
    delete "Api Users Registrations#destroy" do
      tags "Api Users Registrations"
      produces "application/json"

      response "204", "auto" do
        run_test!
      end
    end
  end

  path "/api/users" do
    patch "Api Users Registrations#update" do
      tags "Api Users Registrations"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users" do
    post "Api Users Registrations#create" do
      tags "Api Users Registrations"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "201", "auto" do
        run_test!
      end
    end
  end

  path "/api/users" do
    put "Api Users Registrations#update" do
      tags "Api Users Registrations"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/cancel" do
    get "Api Users Registrations#cancel" do
      tags "Api Users Registrations"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/edit" do
    get "Api Users Registrations#edit" do
      tags "Api Users Registrations"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/sign_up" do
    get "Api Users Registrations#new" do
      tags "Api Users Registrations"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end


  # api/users/sessions
  path "/api/users/sign_in" do
    get "Api Users Sessions#new" do
      tags "Api Users Sessions"
      produces "application/json"

      response "200", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/sign_in" do
    post "Api Users Sessions#create" do
      tags "Api Users Sessions"
      produces "application/json"
      consumes "application/json"

      # TODO: define request body schema
      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }

      response "201", "auto" do
        run_test!
      end
    end
  end

  path "/api/users/sign_out" do
    delete "Api Users Sessions#destroy" do
      tags "Api Users Sessions"
      produces "application/json"

      response "204", "auto" do
        run_test!
      end
    end
  end


end