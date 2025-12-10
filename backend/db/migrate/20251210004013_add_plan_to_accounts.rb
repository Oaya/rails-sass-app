class AddPlanToAccounts < ActiveRecord::Migration[8.1]
  def change
    add_reference :tenants, :plan, null: false, foreign_key: true
    remove_reference :users, :account, foreign_key: true

    drop_table :accounts do |t|
      t.string :name
      t.timestamps null: false
    end
  end
end
