class AddUserName < ActiveRecord::Migration[8.1]
  def change
    add_column :users, :is_admin, :boolean, default: false
    add_column :users, :first_name, :string, null: false
    add_column :users, :last_name, :string, null: false
  end
end
