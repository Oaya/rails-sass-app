class AddReferece < ActiveRecord::Migration[8.1]
  def change
    add_reference :resources, :project , null: false, foreign_key: true
  end
end
