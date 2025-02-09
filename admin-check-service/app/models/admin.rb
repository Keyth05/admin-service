models/ admin.rb

require 'sinatra/activerecord'

class Admin < ActiveRecord::Base
  self.table_name = 'admin'
  validates :email, presence: true, uniqueness: true
end
