class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
  end

  def edit
  end

  def destroy
    @user = User.find(params[:id])

    if @user.destroy
        redirect_to root_url, notice: "User deleted."
      else
        redirect_to root_url, notice: "User NOT deleted."
    end
  end
end
