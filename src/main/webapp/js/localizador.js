$(function(){
	$('#idlocalizador').addClass('resaltado');
});

function initMap() {	
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 19.356703, lng: -99.276124}
    });
    directionsDisplay.setMap(map);

      calculateAndDisplayRoute(directionsService, directionsDisplay);
   
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    var checkboxArray = document.getElementById('waypoints');
        waypts.push({
          location: new google.maps.LatLng(19.358616,-99.272240),
          stopover: true });
        
        waypts.push({
            location: new google.maps.LatLng(19.359259,-99.270940),
            stopover: true });

    directionsService.route({
      origin: new google.maps.LatLng(19.356703,-99.276124),
      destination: new google.maps.LatLng(19.360205,-99.269333),
      waypoints: waypts,
      optimizeWaypoints: true,
      travelMode: 'WALKING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
              '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }