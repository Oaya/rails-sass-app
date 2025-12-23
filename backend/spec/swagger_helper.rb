# frozen_string_literal: true

require 'rails_helper'

RSpec.configure do |config|
  # Specify a root folder where Swagger JSON files are generated
  # NOTE: If you're using the rswag-api to serve API descriptions, you'll need
  # to ensure that it's configured to serve Swagger from the same folder
  config.openapi_root = Rails.root.join('swagger').to_s

  # Define one or more Swagger documents and provide global metadata for each one
  # When you run the 'rswag:specs:swaggerize' rake task, the complete Swagger will
  # be generated at the provided relative path under openapi_root
  # By default, the operations defined in spec files are added to the first
  # document below. You can override this behavior by adding a openapi_spec tag to the
  # the root example_group in your specs, e.g. describe '...', openapi_spec: 'v2/swagger.json'
  config.openapi_specs = {
    "v1/swagger.yaml" => {
      openapi: "3.0.1",
      info: {
        title: "API V1",
        version: "v1"
      },
      paths: {},
      servers: [
        { url: "http://localhost:3000" }
      ],
      components: {
        schemas: {
          # Plan
          
          Plan: {
            type: :object,
            properties: {
              id: { type: :integer },
              name: { type: :string },
              price: { type: :number },
              features: {
                type: :object,
                additionalProperties: { type: :string },
                example: { member: "10", project_number: "10" }
              }
            },
            required: %w[id name price features]
          },

          PlansResponse: {
            type: :array,
            items: {
              "$ref" => "#/components/schemas/Plan"
            }
          },

          # Project
          
          Project: {
            type: :object,
            properties: {
              id: {type: :string},
              title: { type: :string },
              details: { type: :string, nullable: true },
              expected_completion_date: { type: :string, format: :date, nullable: true },
              created_by: {
                type: :object,
                properties: {
                  first_name: {type: :string},
                  last_name: {type: :string}
                }
              }
            },
            required: %w[id title created_by]
          },


          ProjectsResponse: {
            type: :array,
            items: {
              "$ref" => "#/components/schemas/Project"
            }
          },



          ProjectCreateRequest: {
            type: :object,
            properties: {
              title: { type: :string },
              details: { type: :string, nullable: true },
              expected_completion_date: { type: :string, format: :date, nullable: true }
            },
            required: ["title"]
          },

          ProjectUpdateRequest: {
            type: :object,
            properties: {
                type: :object,
                properties: {
                  title: { type: :string },
                  details: { type: :string, nullable: true },
                  expected_completion_date: {
                    type: :string,
                    format: :date,
                    nullable: true
                  }
                }
            }
          }
        }
      }
    }
  }

  # Specify the format of the output Swagger file when running 'rswag:specs:swaggerize'.
  # The openapi_specs configuration option has the filename including format in
  # the key, this may want to be changed to avoid putting yaml in json files.
  # Defaults to json. Accepts ':json' and ':yaml'.
  config.openapi_format = :yaml
end
