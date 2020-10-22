class ClientsController < ApplicationController
  before_action :load_resource, only: [:show, :update, :destroy, :reset_password]

  def index
    render json: Client.all
  end

  def get_current_client
    render json: current_client&.full_name
  end

  def show; end

  def create
    client = Client.new(permitted_params)
    client.password = params[:password]
    client.save! ? 200 : 422
  end

  def update
    if @client.update(permitted_params)
      @client.organizations.clear
      params[:client][:organizations].each do |id|
        @client.organizations << Organization.find(id)
      end

      200
    else
      422
    end
  end

  def destroy
    @client.destroy
  end

  def reset_password
    @client.reset_password(params[:password], params[:password]) ? 200 : 422
  end

  private

  def load_resource
    @client = Client.find(params[:id])
  end

  def permitted_params
    params.require(:client).permit(:full_name, :phone, :email)
  end
end
