Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "bodycare-app-frontend.herokuapp.com", "localhost:8000"

    resource "*",
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
