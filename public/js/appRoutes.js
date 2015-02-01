angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, $http) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/donate', {
			templateUrl: 'views/donate.html',
			controller: 'DonateController'
		})

		.when('/reauthenticate', {
			templateUrl: 'views/reauthenticate.html'
			//controller: 'ReAuthenticate'
		})

		.when('/login', {
			templateUrl: 'views/login.html'
		})

		.when('/drive', {
			templateUrl: 'views/drive.html',
			controller: 'DriveController'
		})

		.when('/driver_map', {
			templateUrl: 'views/mapView.html',
			controller: 'MapController'
		});

	$locationProvider.html5Mode(true);

}]);
