class StaffsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def get_current_staff
    render json: current_staff&.email
  end

  def create_client
    client = Client.new
    client.email = params[:client][:email]
    client.password = params[:client][:password]
    client.password_confirmation = params[:client][:password]
    if client.save!
      200
    else
      500
    end
  end
end
