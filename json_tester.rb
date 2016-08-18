require 'pry'
require 'json'

file = File.read('output_arr_file')
data = JSON.parse(file)
binding.pry
print data["suburbs"][0]
