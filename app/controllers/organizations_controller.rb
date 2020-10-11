class OrganizationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if client_signed_in?
      render json: current_client.organizations
    elsif params[:client_id].present?
      render json: Client.find(params[:client_id]).organizations
    else
      render json: Organization.all
    end
  end

  def create
    organization = Organization.new
    organization.name     = params[:organization][:name]
    organization.org_type = params[:organization][:org_type]
    organization.inn      = params[:organization][:inn]
    organization.ogrn     = params[:organization][:ogrn]
    if organization.save!
      200
    else
      422
    end
  end

  def update
    organization = Organization.find(params[:id])
    organization.name     = params[:organization][:name]
    organization.org_type = params[:organization][:org_type]
    organization.inn      = params[:organization][:inn]
    organization.ogrn     = params[:organization][:ogrn]
    
    if organization.save!
      organization.clients.clear
      params[:organization][:clients].each do |id|
        organization.clients << Client.find(id)
      end

      200
    else
      422
    end
  end

  def destroy
    organization = Organization.find(params[:id])
    organization.destroy
  end
end
