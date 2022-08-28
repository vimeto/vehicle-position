class Vehicle < ApplicationRecord
  belongs_to :user

  scope :for_api_key, -> (api_key) { joins(user: :api_keys).where("api_keys.token" => api_key) }

  def as_json
    {
      id: self.id,
      lat: self.lat,
      long: self.long,
      external_id: self.external_id
    }
  end
end
