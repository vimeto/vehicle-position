
class ApiKeysController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user!, only: [:index, :create]

  def index
    render get_json_response({ api_keys: current_user.api_keys.as_json })
  end

  def create
    name = params[:name]

    if !name.present?
      render json: {
        error: "Please provide a name",
        status: 400
      }, status: 400
      return
    end

    new_token = current_user.api_keys.new(name: name)
    new_token.create_api_token

    if !new_token.save
      render json: {
        error: "save did not succeed",
        status: 500
      }, status: 500
      return
    else
      render get_json_response({ api_keys: current_user.api_keys.as_json })
    end
  end
end
