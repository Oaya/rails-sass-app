class Tenant < ApplicationRecord
  has_many :users, dependent: :destroy
  belongs_to :plan

  validates :name, presence: true, uniqueness: true
end