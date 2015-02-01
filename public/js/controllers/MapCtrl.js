angular.module('MapCtrl', []).controller('MapController', function($scope){

  this.map;

  //PLACEHOLDER FOR DATABASE
  $scope.pickup = [
      { 
        address: "Location 1",
        latitude: 43.658425, 
        longitude: -79.395080,
        distance: 0.0,
        marker: {}
      },
      { 
        address: "Location 2",
        latitude: 43.663579,
        longitude: -79.404608,
        distance: 0.0,
        marker: {}
      },
      { 
        address: "Location 3",
        latitude: 43.666218, 
        longitude: -79.400702,
        distance: 0.0,
        marker: {}
      },
      { 
        address: "Location 4",
        latitude: 43.666816, 
        longitude: -79.393921,
        distance: 0.0,
        marker: {}
      },
      { 
        address: "Location 5",
        latitude: 43.662731, 
        longitude: -79.391132,
        distance: 0.0,
        marker: {}
      }

  ];

  this.initialize = function(position){
    

    $scope.currentPosition = {latitude: position.coords.latitude, longitude: position.coords.longitude }
    console.log($scope.currentPosition);

    var map_canvas = document.getElementById("map_canvas");

    var mapOptions = {
      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      zoom: 14,
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    };

    this.map = new google.maps.Map(map_canvas, mapOptions);

    // AutoComplete
    var input = document.getElementById('homeLocation');
    var options = {
      types: ['geocode'],
      componentRestrictions: {country: 'ca'}
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);

    
    // Allow user to click off donation picks

    // display donations on map
  }

  $scope.setLocation = function(){
    $scope.pickupShow = true;
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("homeLocation").value;
    console.log("HERE");
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });

    for (var i = $scope.pickup.length - 1; i >= 0; i--) {
      var latLng = new google.maps.LatLng($scope.pickup[i].latitude, $scope.pickup[i].longitude);
      var marker = new google.maps.Marker({
        map: map,
        position: latLng,
        animation: google.maps.Animation.DROP
      });
      $scope.pickup[i].marker = marker;
      console.log($scope.pickup[i]);
    };
    $scope.getDistance();
  }

  this.getLocation = function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.initialize);
    } else {
        // var position = {
        //     coords : {
        //     latitude : 43.7000,
        //     longitude : -79.4000
        //   }
        // }
        // console.log(position);
        // this.initialize(position);
    }
  }
  this.getLocation();


  $scope.getDistance = function(){
    for (var i = $scope.pickup.length - 1; i >= 0; i--) {
      $scope.pickup[i].distance = $scope.distanceTo($scope.currentPosition, $scope.pickup[i]);
      console.log($scope.pickup[i].distance);
    };

  }

  $scope.distanceTo = function(LatLng1, LatLng2 ){
    var PI = 3.14159265359
    var radius = 6371.01 // Radius of the earth in Km

    //Convert to radians
    var radLatLng1 = {
      latitude: LatLng1.latitude * PI / 180,
      longitude: LatLng1.longitude * PI / 180
    }

    var radLatLng2 = {
      latitude: LatLng2.latitude * PI / 180,
      longitude: LatLng2.longitude * PI / 180
    }

    // Return distance in same measure of radius
    return Math.acos(
      Math.sin(radLatLng1.latitude) * Math.sin(radLatLng2.latitude) +
      Math.cos(radLatLng1.latitude) * Math.cos(radLatLng2.latitude) *
      Math.cos(radLatLng1.longitude - radLatLng2.longitude)) * radius;

  }

  
  $scope.jumpMarker = function(index){
      var marker = $scope.pickup[index].marker;
      if (marker.getAnimation() != null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
      setTimeout(function(){ marker.setAnimation(null); }, 750);
  }
  
  $scope.pickupDetails = function(){
    $scope.pickupShow = false;
    
  }

  $scope.test = $scope.distanceTo($scope.pickup[1], $scope.pickup[2]);


});
