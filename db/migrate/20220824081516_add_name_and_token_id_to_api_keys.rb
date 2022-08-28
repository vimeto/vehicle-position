class AddNameAndTokenIdToApiKeys < ActiveRecord::Migration[7.0]
  def change
    add_column :api_keys, :name, :string
    add_column :api_keys, :token, :string
  end
end
