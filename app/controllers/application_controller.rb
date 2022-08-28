class ApplicationController < ActionController::Base
  protect_from_forgery

  def get_json_response(data = {}, metadata = nil, status_code = 200)
    {
      json: {
        data: data,
        metadata: metadata
      },
      status: status_code
    }
  end

  protected
  def authenticate_user!
    if user_signed_in?
      super
    else
      redirect_to login_path, notice: "Please Login to view that page!"
    end
  end
end
