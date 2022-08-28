class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: session_params[:email].downcase)
    if user && user.authenticate(session_params[:password])
      log_in(user)
      render json: {
        user: user
      }
    else
      render json: {
        status: 401,
        error: "Could not authenticate"
      }
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end
end
