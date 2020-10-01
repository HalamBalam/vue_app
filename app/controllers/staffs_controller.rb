class StaffsController < ApplicationController
  def get_current_staff
    render json: current_staff&.email
  end
end
