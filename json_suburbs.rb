require 'pry'
require 'json'

file = File.read('suburbs.geojson')
data = JSON.parse(file)

suburb_arr.each do |sub_name|

  data["features"].each do |suburb| sub_name

    if suburb["properties"]["SUBURB"] == sub_name

      @suburb_hash[sub_name] = data["features"][0]["geometry"]["coordinates"][0][0]

    end

  end

end
binding.pry

file2 = File.open('output_hash', 'w')

@suburb_hash.each do |suburb|
  file2.print(suburb)
  file2.puts('')
end
