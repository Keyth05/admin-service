require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv/load'
require './app/models/admin'

set :database, { adapter: 'mysql2', database: ENV['DATABASE'], host: ENV['DATASOURCE_URL'], username: ENV['DATASOURCE_USERNAME'], password: ENV['DATASOURCE_PASSWORD'], port: ENV['DATASOURCE_PORT'] }

port 1028

get '/' do
  status 200
  'Add Admin Service is running ...'
end

post '/admin' do
  request_payload = JSON.parse(request.body.read) rescue {}
  email = request_payload['email']

  if email.nil? || email.empty?
    halt 400, { error: 'Email is required' }.to_json
  end

  begin
    admin = Admin.create!(email: email)
    status 201
    admin.to_json
  rescue ActiveRecord::RecordNotUnique
    halt 409, { error: 'Duplicate entry', message: "The email '#{email}' is already in use." }.to_json
  rescue StandardError => e
    halt 500, { error: 'Internal server error', message: e.message }.to_json
  end
end
