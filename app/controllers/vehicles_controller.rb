
class VehiclesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    api_key = params[:api_key]
    vehicle_ids = params[:vehicle_ids]


    if !api_key.present?
      render json: {
        error: "apikey not present",
        status: 400
      }, status: 400
      return
    end

    if !vehicle_ids.present?
      render json: {
        error: "vehicles not present",
        status: 400
      }, status: 400
      return
    end

    vehicles = Vehicle.for_api_key(api_key).where(external_id: vehicle_ids).as_json

    render get_json_response({ vehicles: vehicles })
  end

  def all_vehicle_ids
    api_key = params[:api_key]

    if !api_key.present?
      render json: {
        error: "apikey not present",
        status: 400
      }, status: 400
      return
    end

    vehicle_ids = Vehicle.for_api_key(api_key).map(&:external_id)

    render get_json_response({ vehicle_ids: vehicle_ids })
  end
end
