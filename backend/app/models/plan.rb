class Plan < ApplicationRecord
  has_many :tenants, dependent: :restrict_with_exception

  validates :name, presence: true, uniqueness: true
  validates :price, presence: true


  def free?
    plan.name == "free"
  end

  def standard?
    plan.name == "standard"
  end

  def premium?
    plan.name == "premium"
  end
end
