class AddUniqueIndexToTenantName < ActiveRecord::Migration[8.1]
  def change
    add_index :tenants, :name, unique: true
  end
end
