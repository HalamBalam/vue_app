Rails.application.routes.draw do
  root 'application#index'

  resources :clients, only: [:index, :create]

  devise_for :staffs
  devise_for :clients

  get :current_staff, to: 'staffs#get_current_staff'
end
