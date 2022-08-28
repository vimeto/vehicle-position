class ApiKey < ApplicationRecord
  HMAC_SECRET_KEY = ENV.fetch('API_KEY_HMAC_SECRET_KEY')

  belongs_to :user

  def as_json
    {
      name: self.name,
      token: self.token
    }
  end

  def create_api_token
    self.token = loop do
      random_token = SecureRandom.urlsafe_base64(nil, false)
      break random_token if !ApiKey.exists?(token: random_token)
    end
  end
end
