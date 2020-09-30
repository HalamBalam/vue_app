Rails.application.routes.draw do
  root 'application#index'

  devise_for :staffs
  devise_for :clients

  resources :clients, only: [:index]

  get :current_staff, to: 'staffs#get_current_staff'
  post :create_client, to: 'staffs#create_client'

  get :items, to: 'items#index'
end
