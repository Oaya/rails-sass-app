class RemovePlanStringFromTenants < ActiveRecord::Migration[8.1]
  def change
    remove_column :tenants, :plan, :string
  end
end
