class AddApiKeysToUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :api_keys, :user, foreign_key: true
  end
end
