Rails.application.routes.draw do
  # 既存の API ルート
  namespace :api do
    namespace :v1 do
      resources :users, only: [:show, :create, :update]
      resources :body_assessments, only: [:index, :show, :create]
      resources :stretches, only: [:index, :show]
      resources :user_stretches, only: [:index, :create, :update]
      post '/login', to: 'auth#login'
      get '/me', to: 'auth#me'
    end
  end

  # WebSocket 用にActionCableをマウント
  mount ActionCable.server => '/ws'

  get "up" => "rails/health#show", as: :rails_health_check
end
