class User < ApplicationRecord
  belongs_to :tenant
  has_many :created_projects,
        class_name: "Project",
        foreign_key: :created_by_id,
        dependent: :nullify
  
  # The token will be expired once logged out
  # jit is the json token identifier and unique ID for token. and Devise-JWT uses it for the token revocation strategy to invalidate old or logged-out tokens
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :invitable,
         :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :confirmable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: self
end
