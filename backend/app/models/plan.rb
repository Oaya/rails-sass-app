class Plan < ApplicationRecord
  has_many :tenants, dependent: :restrict_with_exception

  validates :name, presence: true, uniqueness: true
  validate :price_cents, presence: true


  def free?
    plan.name == "free"
  end

  def premium?
    plan.name == "premium"
  end
end
