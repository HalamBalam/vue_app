class ApplicationController < ActionController::Base
  def index; end
  
  def clients_dashboard
    render layout: 'clients_dashboard'
  end
end
