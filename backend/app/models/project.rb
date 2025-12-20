class Project < ApplicationRecord
  belongs_to :tenant, dependent: :destroy
  belongs_to :created_by, class_name: "User"

  validates :title, presence: true
end
