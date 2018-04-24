class MainController < ApplicationController
  before_action :authenticate_user!
  def index
    render :text => "Welcome #{current_user.email}!"
  end
end
