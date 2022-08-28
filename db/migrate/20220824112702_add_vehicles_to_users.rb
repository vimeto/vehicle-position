class AddVehiclesToUsers < ActiveRecord::Migration[7.0]
  def change
    add_reference :vehicles, :user, foreign_key: true
  end
end
