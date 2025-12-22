class Project < ApplicationRecord
  belongs_to :tenant
  belongs_to :created_by, class_name: "User"
  has_many :resources, dependent: :destroy

  validates :title, presence: true
end 
