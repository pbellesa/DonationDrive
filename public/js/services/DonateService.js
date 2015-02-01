angular.module('DonateService', []).factory('Donate', ['$http', '$rootScope', function($http, $rootScope) {


    var service = {
      submitQuantities: function(row, quantity) {
        var promise = null;
        var donationQuantities = {};
        if($rootScope.userProfile) {
          donationQuantities.userId = $rootScope.userProfile.userId;

          donationQuantities.clothes = 0;
          donationQuantities.toys = 0;
          donationQuantities.foods = 0;

          switch(row){
            case 1:
                donationQuantities.clothes = +quantity;
                break;
            case 2:
                donationQuantities.toys = +quantity;
                break;
            case 3:
                donationQuantities.foods = +quantity;
                break;
          }

          promise = $http.post('/submitItems/' + 1, donationQuantities)
            .success(function(data) {
            //$scope.formData = {}; // clear the form so our user is ready to enter another
            //$scope.todos = data;
            console.dir(data);
          });
        }

        return promise;
      }
    };

    return service;
}]);
