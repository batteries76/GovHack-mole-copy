console.log('MapRender4');

// dataJson = {
//             "suburbs": [
//                 {
//                   "polygon": [[]],
//                   "langPercent": 10.3
//                 }
//               ]
// }

settings = {
    url: 'http://localhost:4567/suburb_data',
    dataType: 'json'
}

$.ajax(settings).done(function(suburbs_json){

//  suburbs_json = JSON.suburbs_data
  console.log(suburbs_json);
  console.log('In the done function');
//  debugger;

  function initMap(suburbs_json) {

    var lat = suburbs_json.suburbs[0].polygon[0][1];
    var lng = suburbs_json.suburbs[0].polygon[0][0];

    console.log(lat);

    var centre = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: centre
    });

    _.each(suburbs_json.suburbs, function(suburb){

      console.log('In the map render');
      console.log(suburb);
      colourArr = [ '#a50d2c', '#c51b45', '#ff7f50', '#ffa483', '#e4d836', '#ffff66' ];
      languagePercentage = Number(suburb.langPercent);

      console.log(languagePercentage);
//debugger;

      if (languagePercentage<2&&languagePercentage>=0){
        colour = colourArr[5];
        console.log('In 5');
      }
      else if (languagePercentage<4&&languagePercentage>=2){
        colour = colourArr[4];
        console.log('In 4');
      }
      else if (languagePercentage<6&&languagePercentage>=4){
        colour = colourArr[3];
        console.log('In 3');
      }
      else if (languagePercentage<8&&languagePercentage>=6){
        colour = colourArr[2];
        console.log('In 2');
      }
      else if (languagePercentage<10&&languagePercentage>=8){
        colour = colourArr[1];
        console.log('In 1');
      }
      else if(languagePercentage>=10){
        colour = colourArr[0];
        console.log('In 0');
      }
      else {
        colour = '#000000';
        console.log('In else');
      }

      suburbArr = []

      _.each(suburb.polygon, function(coords) {
//        console.log(coords);
        hashTemp = {}
        hashTemp['lat'] = coords[1];
        hashTemp['lng'] = coords[0];
        suburbArr.push(hashTemp);
//        debugger;
      })

      var subPolygons = new google.maps.Polygon({
        paths: suburbArr,
        strokeColor: colour,
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: colour,
        fillOpacity: 0.8
      });

      subPolygons.setMap(map);

    });

  };

  initMap(suburbs_json);

}).fail(function(err) {
  console.log(err);
});
