angular.module('MapCtrl', []).controller('MapController', function($scope){
  console.log("map loaded");

  var map_canvas = document.getElementById("map_canvas");

  var mapOptions = {
    center: new google.maps.LatLng(43.658938, -79.392812),
    zoom: 14,
    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
  };

  var map = new google.maps.Map(map_canvas, mapOptions);

  // Allow user to click off donation picks

  // display donations on map

});
