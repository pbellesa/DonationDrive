angular.module('AuthenticateService', []).factory('Authenticate', ['$http', function($http) {
    var service = {
      userAuthenticated: function() {

        var promise = $http.get('/authenticate' + 1, donationQuantities)
            .success(function(data) {
            //$scope.formData = {}; // clear the form so our user is ready to enter another
            //$scope.todos = data;
            console.dir(data);
        });

        return promise;
      },

    checkRoutes: function ($q, $rootScope, $location) {
        if ($rootScope.userProfile) {
            return true;
        } else {
            var deferred = $q.defer();

            $http.get("/auth/userId")
                .success(function (response) {
                    $rootScope.userProfile = response;
                    console.log("Response", response);

                    deferred.resolve(true);
                })
                .error(function () {
                    deferred.reject();
                    $location.path("/");
                 });
            return deferred.promise;
        }
    }

    };

    return service;
}]);
