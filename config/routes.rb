Rails.application.routes.draw do
  root 'application#index'

  namespace :admin do
    devise_for :staffs
  end

  namespace :user do
    devise_for :clients
  end
  
end
