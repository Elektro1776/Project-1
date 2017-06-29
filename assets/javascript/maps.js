
let MAPS = (spec, mySecrets) => {
  let that, map, infowindow;
   mySecrets = mySecrets || {}

  function createDefaultMap(lat, long) {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.739236, lng: -104.990251},
      zoom: 13,
      mapTypeId: 'roadmap'
    });
  }

  function createMarker(place) {
    console.log(' WHAT IS THE PLACE???', place.geometry);
    var placeLoc = place.geometry.location;
    infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
         map: map,
         position: placeLoc
       });
       google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
  }

  function radar() {
       infoWindow = new google.maps.InfoWindow();
       service = new google.maps.places.PlacesService(map);

       // The idle event is a debounced event, so we can query & listen without
       // throwing too many requests at the server.
       map.addListener('idle', performSearch);
     }

     function performSearch() {
       var request = {
         bounds: map.getBounds(),
         keyword: 'brewery'
       };
       service.radarSearch(request, callback);
     }

     function callback(results, status) {
       if (status !== google.maps.places.PlacesServiceStatus.OK) {
         console.error(status);
         return;
       }
       for (var i = 0, result; result = results[i]; i++) {
          service.getDetails(result, function(result, status) {
            console.log('what are the details?????', result);
          })
         addMarker(result);
       }
     }

     function addMarker(place) {
       var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location,
         icon: {
           url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
           anchor: new google.maps.Point(10, 10),
           scaledSize: new google.maps.Size(10, 17)
         }
       });

       google.maps.event.addListener(marker, 'click', function() {
         service.getDetails(place, function(result, status) {
           if (status !== google.maps.places.PlacesServiceStatus.OK) {
             console.error(status);
             return;
           }
          //  console.log(" WHAT IS OUR RESULT ON CLICK ???", result);
           infoWindow.setContent(result.name);
           infoWindow.open(map, marker);
         });
       });
  }
  that = {};
  that.createDefaultMap = createDefaultMap;
  // that.createMapMarkers = createMapMarkers;
  // that.textSearch = googleTextSearch;
  that.radar = radar;

  return that;
}

// function googleTextSearch() {
//   var service;
//   var infowindow;
//
// function initialize() {
//   var location = new google.maps.LatLng(39.739236,-104.990251);
//
//   map = new google.maps.Map(document.getElementById('map'), {
//       center: location,
//       zoom: 12
//     });
//
//   var request = {
//     location: location,
//     radius: '3600',
//     query: 'brewery'
//   };
//
//   service = new google.maps.places.PlacesService(map);
//   service.textSearch(request, callback);
// }
//
// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }
// initialize();
//
// }
