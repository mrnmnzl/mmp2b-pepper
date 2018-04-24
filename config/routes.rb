Rails.application.routes.draw do
  resources :peppers
  resources :main
  devise_for :users
  resources :users

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
   root 'main#index'

end
