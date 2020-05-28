Rails.application.routes.draw do
  resources :videos, only: [:index, :create]
end
