class MainController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = User.find(current_user.id)
    @peppers=Pepper.where(user_id:"@user.id")
  end
end
