class Tenant < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :projects, dependent: :destroy
  has_many :resources, dependent: :destroy
  belongs_to :plan

  validates :name, presence: true, uniqueness: true


  def projects_count
    projects.count
  end
end