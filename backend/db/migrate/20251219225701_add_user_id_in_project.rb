class AddUserIdInProject < ActiveRecord::Migration[8.1]
  def change
    add_reference :projects, :created_by, null: false, foreign_key: {to_table: :users}


  end
end
