angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

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

		.when('/drive', {
			templateUrl: 'views/drive.html',
			controller: 'DriveController'	
		});

	$locationProvider.html5Mode(true);

}]);