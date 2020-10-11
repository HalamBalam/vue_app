class ClientsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    if params[:organization_id].present?
      render json: Organization.find(params[:organization_id]).clients
    else
      render json: Client.all
    end
  end

  def get_current_client
    render json: current_client&.full_name
  end

  def create
    client = Client.new
    client.full_name = params[:client][:full_name]
    client.phone     = params[:client][:phone]
    client.email     = params[:client][:email]
    client.password  = params[:client][:password]
    if client.save!
      200
    else
      422
    end
  end

  def update
    client = Client.find(params[:id])
    client.full_name = params[:client][:full_name]
    client.phone     = params[:client][:phone]
    client.email     = params[:client][:email]
    
    if client.save!
      client.organizations.clear
      params[:client][:organizations].each do |id|
        client.organizations << Organization.find(id)
      end

      200
    else
      422
    end
  end

  def destroy
    client = Client.find(params[:id])
    client.destroy
  end
end
