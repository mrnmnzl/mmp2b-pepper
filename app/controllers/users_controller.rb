class UsersController < ApplicationController
  def index
    @users = User.all
  end

  def show
      @user = User.find(params[:id])
      @peppers=Pepper.where(user_id:"@user.id")
  end

  def edit
  end

  def destroy
    @user = User.find(current_user.id)

    if @user.destroy
        redirect_to root_url, notice: "User deleted."
      else
        redirect_to root_url, notice: "User NOT deleted."
    end
  end
end
