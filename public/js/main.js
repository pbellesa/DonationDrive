// MAPS
 function initialize(position) {
    var mapOptions = {
      center: { lat: position.coords.latitude, lng: position.coords.longitude},
      zoom: 14
    };
    var map = new google.maps.Map(document.getElementById('map_canvas'),
        mapOptions);
  }
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(initialize);
    } else {
        
    }
}
  google.maps.event.addDomListener(window, 'load', getLocation);