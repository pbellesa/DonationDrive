angular.module('MainCtrl', []).controller('MainController', function($scope, $q, $rootScope, $location, Authenticate) {

	$scope.tagline = 'We pickup your donations!';
  $scope.showMainHeader = false;

  //checkLoginState();

  console.log(Authenticate);
  Authenticate.checkRoutes($q, $rootScope, $location);
  // Check if user is logged in.
  //  -> if yes, show donate view
  //  else
  //  -> show reauthenticate view, with reauthenticate message
});
