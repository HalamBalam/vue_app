class EquipmentsController < ApplicationController
  before_action :load_resource, only: [:show, :update, :destroy]

  def index
    render json: Equipment.all
  end

  def show; end

  def create
    equipment = Equipment.new(permitted_params)
    if equipment.save!
      200
    else
      422
    end
  end

  def update
    if @equipment.update(permitted_params)
      200
    else
      422
    end
  end

  def destroy
    @equipment.destroy
  end

  private

  def load_resource
    @equipment = Equipment.find(params[:id])
  end

  def permitted_params
    params.require(:equipment).permit(:name, :equipment_type, :serial_number)
  end
end
