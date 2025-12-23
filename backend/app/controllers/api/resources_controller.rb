# app/controllers/api/resources_controller.rb
require "aws-sdk-s3"

module Api
  class ResourcesController < ApplicationController
    before_action :authenticate_user!




    # POST /api/projects/:project_id/resources
    def create
      project = Current.tenant.projects.find(params[:project_id])
      title = params.require(:title)
      filename = params.require(:filename)
      content_type = params.require(:content_type)
      byte_size = params.require(:byte_size).to_i

      key = build_s3_key(project_id: project.id, filename: filename)

      resource = Resource.create!(
        project: project,
        tenant: Current.tenant,
        created_by: Current.user,
        title: title,
        s3_key: key,
        content_type: content_type,
        byte_size: byte_size,
        status: "pending"
      )

      put_url = presigned_put_url(
        key: resource.s3_key,
        content_type: content_type
      )

      render json: {
        id: resource.id,
        title: resource.title,
        status: resource.status,
        put_url: put_url
      }, status: :created
    end

    def complete
      resource = Current.tenant.resources.find(params[:id])

      head = s3_client.head_object(
        bucket: s3_bucket,
        key: resource.s3_key
      )

      if resource.byte_size && head.content_length != resource.byte_size
        resource.update!(status: "failed")
        return render json: { error: "size_mismatch" }, status: :unprocessable_entity
      end

      resource.update!(
        status: "uploaded",
        byte_size: head.content_length,
        content_type: head.content_type,
      )

      render json: { ok: true }, status: :ok
    end

    def download_url
      resource = Current.tenant.resources.find(params[:id])

      url = presigned_get_url(key: resource.s3_key)

      render json: { url: url }, status: :ok
    end

    private

    def s3_bucket = ENV.fetch("S3_BUCKET")
    def s3_region = ENV.fetch("AWS_REGION")

    def s3_client
      @s3_client ||= Aws::S3::Client.new(region: s3_region)
    end

    def presigner
      @presigner ||= Aws::S3::Presigner.new(client: s3_client)
    end

    def presigned_put_url(key:, content_type:)
      presigner.presigned_url(
        :put_object,
        bucket: s3_bucket,
        key: key,
        content_type: content_type,
        acl: "private",
        expires_in: 300
      )
    end

    def presigned_get_url(key:)
      presigner.presigned_url(
        :get_object,
        bucket: s3_bucket,
        key: key,
        expires_in: 300
      )
    end

    def build_s3_key(project_id:, filename:)
      safe = filename.gsub(/[^\w.\-]/, "_")
      "tenants/#{current_user.tenant_id}/project/#{project_id}/resources/#{SecureRandom.uuid}-#{safe}"
    end
  end
end
