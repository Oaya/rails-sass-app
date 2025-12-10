class RenamePriceCentsToPriceInPlans < ActiveRecord::Migration[8.1]
  def change
    rename_column :plans, :price_cents, :price
  end
end
