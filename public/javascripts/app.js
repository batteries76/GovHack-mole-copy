console.log('in app.js');

var settings = {
  url: '',
}

// $.ajax(settings).done(function(mapStr) {
//
//   console.log('in the ajax call');
//
//   var mapJson = JSON.parse(mapStr);
//
//   var lat = Number(mapJson.data[0].lat);
//   var lng = Number(mapJson.data[0].lng);
//
//   initMap(mapJson);
//
// }).fail(function() {
//
//   console.log('fail!!');
//
// });

mapJson = { 'data':
            [
              {
                'suburb': 'East Melbourne',
                'lat': '-37.8166389465',
                'lng': '144.9878082275'
              },
              {
                'suburb': 'Dandenong',
                'lat': '-38.020',
                'lng': '145.240'
              }
            ]
          }

var initMap = function(mapJson) {

  console.log('map init function');
  console.log(mapJson);

  var lat = Number(mapJson.data[1].lat);
  var lng = Number(mapJson.data[1].lng);

  console.log(lat);
  console.log(lng);

  var centre = {lat: lat, lng: lng};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: centre
  });

  _.each(mapJson.data, function(loc) {
    console.log('in the .each function');
    var lat = Number(loc.lat)
    var lng = Number(loc.lng)
    var marker = new google.maps.Marker({
          position: { lat: lat, lng: lng },
          map: map,
          title: 'test'
        });
  });

  var dandenong = new google.maps.LatLng(-38.020, 145.240);
  // Specify location, radius and place types for your Places API search.
  var request = {
    location: dandenong,
    radius: '500',
    types: ['hospital']
  };

  // Create the PlaceService and send the request.
  // Handle the callback with an anonymous function.
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        var place = results[i];
        // If the request succeeds, draw the place location on
        // the map as a marker, and register an event to handle a
        // click on the marker.
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });
      }
    }
  });

};

initMap(mapJson);

// function initialize() {
//   var pyrmont = new google.maps.LatLng(-33.8665, 151.1956);
//
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: pyrmont,
//     zoom: 15,
//     scrollwheel: false
//   });
//
//   // Specify location, radius and place types for your Places API search.
//   var request = {
//     location: pyrmont,
//     radius: '500',
//     types: ['store']
//   };
//
//   // Create the PlaceService and send the request.
//   // Handle the callback with an anonymous function.
//   var service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, function(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         var place = results[i];
//         // If the request succeeds, draw the place location on
//         // the map as a marker, and register an event to handle a
//         // click on the marker.
//         var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location
//         });
//       }
//     }
//   });
// }
//
// // Run the initialize function when the window has finished loading.
// google.maps.event.addDomListener(window, 'load', initialize);
