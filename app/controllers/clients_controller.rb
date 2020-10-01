class ClientsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def index
    render json: Client.all
  end

  def create
    client = Client.new
    client.email = params[:client][:email]
    client.password = params[:client][:password]
    if client.save!
      200
    else
      500
    end
  end
end
