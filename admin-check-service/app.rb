require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv/load'
require_relative 'app/models/admin'

set :port, 1029

get '/' do
  'Check Admin Service is running ...'
end

get '/checkAdmin/:email' do
  email = params[:email]

  if email.nil? || email.strip.empty?
    status 400
    return { status: 'Failed', message: 'Email is required' }.to_json
  end

  begin
    is_admin = Admin.exists?(email: email)
    status is_admin ? 200 : 404
    { status: is_admin ? 'OK' : 'Failed', message: is_admin ? 'Admin exists' : 'Admin does not exist' }.to_json
  rescue => e
    puts "Error checking admin: #{e.message}"
    status 500
    { status: 'Failed', message: 'Internal server error' }.to_json
  end
end
