class RemoveApiKeysAttributes < ActiveRecord::Migration[7.0]
  def change
    remove_column :api_keys, :bearer_id
    remove_column :api_keys, :bearer_type
    remove_column :api_keys, :token_digest
  end
end
