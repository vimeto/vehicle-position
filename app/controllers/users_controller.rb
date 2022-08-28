class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :authenticate_user!, only: [:show]

  def show
    @user = User.find(params[:id])
  end

  def index
    respond_to do |format|
      # format.html { render "/react-mui" }
      format.html {  }
      format.json do
        authenticate_user!

        render get_json_response({ user: current_user })
      end
    end
  end

  def new
    @user = User.new
  end

  # def create
  #   @user = User.new(user_params)
  #   if @user.save
  #     log_in(@user)
  #     render json: {
  #       status: :created,
  #       user: @user
  #     }
  #   else
  #     render json: {
  #       status: 500,
  #       error: @user.errors.full_messages
  #     }
  #   end
  # end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
