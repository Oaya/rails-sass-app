# frozen_string_literal: true

require "open3"
require "fileutils"

# Generates rswag skeleton request specs from `bin/rails routes`.
# - Heuristic only (no schemas/auth/real response codes).
# - You will still want to edit responses and add request/response schemas.

OUTPUT_DIR = "spec/requests/rswag"
OUTPUT_FILE = File.join(OUTPUT_DIR, "routes_skeleton_spec.rb")

HTTP_VERBS = %w[GET POST PUT PATCH DELETE].freeze

def run_routes
  cmd = ["bin/rails", "routes"]
  stdout, stderr, status = Open3.capture3(*cmd)
  abort("Failed to run `#{cmd.join(' ')}`:\n#{stderr}") unless status.success?
  stdout
end

def extract_routes(text)
  routes = []

  text.each_line do |line|
    line = line.rstrip
    next if line.empty?
    next if line.start_with?("Prefix", "Routes", "rails")

    parts = line.split(/\s+/)
    next if parts.length < 4

    # Typical format:
    # Prefix Verb URI Pattern Controller#Action
    # Sometimes Prefix is blank-ish; rails routes aligns columns.
    verb_index = parts.find_index { |p| HTTP_VERBS.include?(p) }
    next unless verb_index

    verb = parts[verb_index]
    uri  = parts[verb_index + 1]
    ctrl = parts[verb_index + 2]

    next unless uri&.start_with?("/api/")
    next unless ctrl&.include?("#")

    controller, action = ctrl.split("#", 2)

    # Strip (.:format)
    uri = uri.gsub(/\(\.:format\)/, "")

    routes << {
      verb: verb,
      uri: uri,
      controller: controller,
      action: action
    }
  end

  routes
end

def openapi_path(uri)
  # Convert /api/resources/:id/complete -> /api/resources/{id}/complete
  uri.gsub(/:([a-zA-Z_]\w*)/, '{\1}')
end

def path_params_from(uri)
  uri.scan(/:([a-zA-Z_]\w*)/).flatten.uniq
end

def tag_for(controller)
  # "api/users/sessions" -> "Users Sessions"
  controller.split("/").map { |p| p.gsub("_", " ").split.map(&:capitalize).join(" ") }.join(" ")
end

def rswag_method_name(verb)
  verb.downcase
end

def default_response_code(verb)
  # Heuristic: adjust manually later
  case verb
  when "POST"   then "201"
  when "DELETE" then "204"
  else "200"
  end
end

def consumes_needed?(verb)
  %w[POST PUT PATCH].include?(verb)
end

def generate_spec(routes)
  grouped = routes.group_by { |r| r[:controller] }

  lines = []
  lines << "# frozen_string_literal: true"
  lines << ""
  lines << "require \"swagger_helper\""
  lines << ""
  lines << "RSpec.describe \"API Routes (skeleton)\", type: :request do"
  lines << "  # Auto-generated from `bin/rails routes`."
  lines << "  # TODO: Add auth (securitySchemes), request/response schemas, and correct status codes."
  lines << ""

  grouped.keys.sort.each do |controller|
    tag = tag_for(controller)
    controller_routes = grouped[controller]
      .sort_by { |r| [r[:uri], r[:verb], r[:action]] }

    lines << "  # #{controller}"
    controller_routes.each do |r|
      uri = r[:uri]
      oapi = openapi_path(uri)
      params = path_params_from(uri)
      verb = r[:verb]
      action = r[:action]
      resp_code = default_response_code(verb)

      lines << "  path \"#{oapi}\" do"

      params.each do |p|
        # Default everything to string; you can refine later
        lines << "    parameter name: :#{p}, in: :path, type: :string, description: \"#{p}\""
      end
      lines << "" unless params.empty?

      lines << "    #{rswag_method_name(verb)} \"#{tag}##{action}\" do"
      lines << "      tags \"#{tag}\""
      lines << "      produces \"application/json\""
      lines << "      consumes \"application/json\"" if consumes_needed?(verb)

      if consumes_needed?(verb)
        lines << ""
        lines << "      # TODO: define request body schema"
        lines << "      # parameter name: :payload, in: :body, schema: { type: :object, properties: { ... }, required: [ ... ] }"
      end

      lines << ""
      lines << "      response \"#{resp_code}\", \"auto\" do"
      params.each do |p|
        lines << "        let(:#{p}) { \"TODO\" }"
      end
      lines << "        run_test!"
      lines << "      end"
      lines << "    end"
      lines << "  end"
      lines << ""
    end

    lines << ""
  end

  lines << "end"
  lines.join("\n")
end

routes_text = run_routes
routes = extract_routes(routes_text)

if routes.empty?
  abort("No /api routes found in `bin/rails routes` output.")
end

FileUtils.mkdir_p(OUTPUT_DIR)
File.write(OUTPUT_FILE, generate_spec(routes))

puts "Wrote rswag skeleton spec: #{OUTPUT_FILE}"
puts "Next: bundle exec rake rswag:specs:swaggerize"
