class OrganizationsController < ApplicationController
  before_action :load_resource, only: [:show, :update, :destroy]

  def index
    if client_signed_in?
      render json: current_client.organizations
    else
      render json: FindOrganizations.new(Organization.all).call(params)
    end
  end

  def show; end

  def create
    organization = Organization.new(permitted_params)
    organization.save! ? 200 : 422
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

  def count
    render json: FindOrganizations.new(Organization.all).call(params).count
  end

  private

  def load_resource
    @organization = Organization.find(params[:id])
  end

  def permitted_params
    params.require(:organization).permit(:name, :org_type, :inn, :ogrn)
  end
end
