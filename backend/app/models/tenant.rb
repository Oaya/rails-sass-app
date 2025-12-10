class Tenant < ApplicationRecord
  has_many :users, dependant: :destroy
  belongs_to :plan

  validate :name, presence: true
end
