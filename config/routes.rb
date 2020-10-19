Rails.application.routes.draw do
  root 'application#index'

  resources :clients, only: [:index, :create, :update, :destroy] do
    resources :organizations, only: [:index]
  end

  resources :organizations, only: [:index, :create, :update, :destroy] do
    resources :clients, only: [:index]
  end

  devise_for :staffs
  devise_for :clients

  get :current_staff, to: 'staffs#get_current_staff'
  get :current_client, to: 'clients#get_current_client'

  get :clients_dashboard, to: 'application#clients_dashboard'
end
