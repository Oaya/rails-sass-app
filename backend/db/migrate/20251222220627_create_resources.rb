class CreateResources < ActiveRecord::Migration[8.1]
  def change
    create_table :resources do |t|
      t.references :tenant, null: false, foreign_key: true
      t.references :created_by, null: false, foreign_key: { to_table: :users }
      t.string :title
      t.string :s3_key
      t.string :content_type
      t.bigint :byte_size
      t.string :status

      t.timestamps
    end
  end
end
