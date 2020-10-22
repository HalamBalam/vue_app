class EquipmentsController < ApplicationController
  before_action :load_resource, only: [:show, :update, :destroy]

  def index
    render json: Equipment.all
  end

  def show; end

  def create
    equipment = Equipment.new(permitted_params)
    equipment.save! ? 200 : 422
  end

  def update
    @equipment.update(permitted_params) ? 200 : 422
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
