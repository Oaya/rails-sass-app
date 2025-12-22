class Resource < ApplicationRecord
  belongs_to :tenant
  belongs_to :project
  belongs_to :created_by, class_name: "User"

  enum :status, { pending: "pending", uploaded: "uploaded", failed: "failed" }, default: "pending"
  validates :title, presence: true
  validates :s3_key, presence: true, uniqueness: true
  validate :project_same_tenant

  def project_same_tenant
    return if project&.tenant_id == tenant_id
    errors.add(:project, "must belong to the same tenant")
  end
end

