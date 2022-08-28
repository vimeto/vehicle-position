class CreateVehicles < ActiveRecord::Migration[7.0]
  def change
    create_table :vehicles do |t|
      t.bigint "external_id", null: false
      t.float "lat"
      t.float "long"
      t.timestamps
    end

    add_index :vehicles, :external_id
  end
end
