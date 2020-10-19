class StaffsController < ApplicationController
  def get_current_staff
    render json: current_staff&.email
  end

  def reset_password
    if current_staff&.reset_password(params[:password], params[:password])
      200
    else
      422
    end
  end
end
