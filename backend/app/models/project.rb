class Project < ApplicationRecord
  belongs_to :tenant, dependent: :destroy

  validates :title, presence: true
end
