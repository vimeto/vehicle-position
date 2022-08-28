VehiclePosition::Application.routes.draw do
  root "users#index"

  devise_for :users

  devise_scope :user do
    # Redirests signing out users back to sign-in
    get "users/login", to: "devise/sessions#new", as: :login
  end

  get "vehicles/ids", to: "vehicles#all_vehicle_ids"

  resources :api_keys
  resources :users
  resources :vehicles
end
