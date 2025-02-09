require 'sinatra'
require 'sinatra/activerecord'
require 'dotenv/load'
require_relative 'app/models/admin'

set :database, { adapter: 'mysql2', database: ENV['DATABASE'], host: ENV['DATASOURCE_URL'], username: ENV['DATASOURCE_USERNAME'], password: ENV['DATASOURCE_PASSWORD'], port: ENV['DATASOURCE_PORT'] }
set :port, 1030

get '/' do
  'Delete Admin Service is running ...'
end

# Ruta para eliminar un administrador por su ID
delete '/admin/:admin_id' do
  admin_id = params[:admin_id]

  if admin_id.nil? || admin_id.empty?
    status 400
    return { message: 'Admin ID is required' }.to_json
  end

  begin
    admin = Admin.find_by(admin_id: admin_id)

    if admin
      admin.destroy
      status 200
      { message: "Admin with adminId #{admin_id} deleted successfully." }.to_json
    else
      status 404
      { message: "Admin with adminId #{admin_id} not found." }.to_json
    end
  rescue StandardError => e
    status 500
    { message: 'Error deleting the admin', error: e.message }.to_json
  end
end
