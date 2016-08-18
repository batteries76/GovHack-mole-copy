require 'pry'
require 'json'

file = File.read('geoserver-GetFeature.geojson')
data = JSON.parse(file)
#binding.pry

suburb_arr = [ "DANDENONG", "DANDENONG SOUTH", "GEELONG", "GLENROY", "NORTHCOTE", "SPRINGVALE", "THORNBURY", "WYNDHAM VALE" ]
@suburbs_hash = { "suburbs" => [] }


# sample json
# dataHashEg = {
#              "suburbs": [
#                  {
#                    "name": "blah"
#                    "polygon": [[]],
#                    "langPercent": 10.3
#                  }
#                ]
# }

#binding.pry

suburb_arr.each do |sub_name|

#binding.pry
  data["features"].each do |suburb| sub_name

    if suburb["properties"]["vic_loca_2"] == sub_name


#      @suburb_arr.push(suburb)
      sub_hash = {}
      sub_hash["name"] = sub_name
      sub_hash["polygon"] = suburb["geometry"]["coordinates"][0][0]
      sub_hash["langPercent"] = rand(0.2..10.3).round(2)

      @suburbs_hash["suburbs"].push(sub_hash)
#binding.pry
    end

  end

end

#binding.pry

file2 = File.open('output_arr_file', 'w')
suburbs_json = @suburbs_hash.to_json

file2.print(suburbs_json)
file2.puts('')

file2.close
