# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
#   Seed for plans
#   
plans = [
  {
    name: "free",
    price: 0,
    features: {
      project_number: "10",
      member: "10"
    }
  },
  {
    name: "standard",
    price: 20,
    features: {
      project_number: "50",
      member: "50"
    }
  },
  {
    name: "premium",
    price: 50,
    features: {
      project_number: "unlimited",
      member: "unlimited"
    }
  }
]

plans.each do | plan|
  Plan.create!(name: plan[:name], price: plan[:price], features: plan[:features])
end
