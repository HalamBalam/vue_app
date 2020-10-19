class OrganizationsController < ApplicationController
  before_action :load_resource, only: [:show, :update, :destroy]

  def index
    if client_signed_in?
      render json: current_client.organizations
    elsif params[:client_id].present?
      render json: Client.find(params[:client_id]).organizations
    else
      render json: Organization.all
    end
  end

  def show; end

  def create
    organization = Organization.new(permitted_params)
    if organization.save!
      200
    else
      422
    end
  end

  def update
    if @organization.update(permitted_params)
      
      @organization.clients.clear
      params[:organization][:clients].each do |id|
        @organization.clients << Client.find(id)
      end

      @organization.equipments.clear
      params[:organization][:equipments].each do |id|
        @organization.equipments << Equipment.find(id)
      end

      200
    else
      422
    end
  end

  def destroy
    @organization.destroy
  end

  private

  def load_resource
    @organization = Organization.find(params[:id])
  end

  def permitted_params
    params.require(:organization).permit(:name, :org_type, :inn, :ogrn)
  end
end
