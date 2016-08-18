# myapp.rb
require 'sinatra'
require 'sinatra/reloader'
require 'json'
require 'pry'

get '/' do
  erb :index
end

get '/suburb_data' do
  file = File.read('output_arr_file')
  data = JSON.parse(file)
  json_data = data.to_json
#  json_first_burb = data["suburbs"][0].to_json
  return json_data
end
