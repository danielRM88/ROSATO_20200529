Rails.application.routes.draw do
  resources :videos, only: [:index, :create]
  resources :categories, only: [:index]
end
