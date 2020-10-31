Rails.application.routes.draw do
  root 'application#index'

  constraints -> (req) { req.format == :json } do
    resources :clients, only: [:index, :show, :create, :update, :destroy]
    resources :organizations, only: [:index, :show, :create, :update, :destroy]
    resources :equipments, only: [:index, :show, :create, :update, :destroy]
  end

  devise_for :staffs
  devise_for :clients

  put '/clients/:id/reset_password', to: 'clients#reset_password'
  put '/staffs/reset_password', to: 'staffs#reset_password'

  get :current_staff, to: 'staffs#get_current_staff'
  get :current_client, to: 'clients#get_current_client'

  get :clients_dashboard, to: 'application#clients_dashboard'

  get '/organizations_count', to: 'organizations#count'

  get '/clients/*slug', to: 'application#clients_dashboard'
  get '/staffs/*slug', to: 'application#index'
  get '/*slug', to: 'application#index'
end
