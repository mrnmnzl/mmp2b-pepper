class PeppersController < ApplicationController
  before_action :set_pepper, only: [:show, :edit, :update, :destroy]

  # GET /peppers
  # GET /peppers.json
  def index
    @peppers = Pepper.all
    @user = User.find(current_user.id)
  end

  # GET /peppers/1
  # GET /peppers/1.json
  def show
    @user = User.find(current_user.id)
    @peppers=Pepper.where(user_id:"@user.id")
    @pepper = Pepper.find(params[:id])
    @tasks = @pepper.tasks
  end

  # GET /peppers/new
  def new
    @pepper = Pepper.new
    @user = User.find(current_user.id)
    @peppers=Pepper.where(user_id:"@user.id")
  end

  # GET /peppers/1/edit
  def edit
    @user = User.find(current_user.id)
    @peppers=Pepper.where(user_id:"@user.id")
    @pepper = Pepper.find(params[:id])
  end

  # POST /peppers
  # POST /peppers.json
  def create
    @pepper=Pepper.new(pepper_params)
    @pepper.user_id=current_user.id
    @pepper.done=false
    @pepper.currVal=0


    respond_to do |format|
      if @pepper.save
        format.html { redirect_to pepper_path(@pepper), notice: 'Pepper was successfully created.' }
        format.json { render :show, status: :created, location: @pepper }
      else
        format.html { render :new }
        format.json { render json: @pepper.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /peppers/1
  # PATCH/PUT /peppers/1.json
  def update
    respond_to do |format|
      if @pepper.update(pepper_params)
        format.html { redirect_to @pepper, notice: 'Pepper was successfully updated.'}
        format.json { render json: @pepper, status: :ok }
      else
        format.html { render :edit }
        format.json { render json: @pepper.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /peppers/1
  # DELETE /peppers/1.json
  def destroy
    @pepper.destroy
    respond_to do |format|
      format.html { redirect_to peppers_url, notice: 'Pepper was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pepper
      @pepper = Pepper.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def pepper_params
      params.require(:pepper).permit(:user_id, :name, :deadline, :units, :goal, :type, :positive, :currVal)
    end


end
