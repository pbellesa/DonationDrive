angular.module('DonateCtrl', []).controller('DonateController', function($scope, $http, Donate) {
    var donationQuantities = {
    }; // 1 Clothes, 2 Toys, 3 Food

    $scope.category = [
        false,
        false,
        false
    ];

    this.itemQuantity = 0;

    this.donationQuantitySpinner = [0, 0, 0];

    console.log("Donate service available", Donate);

    $scope.donorContainer = [
        "col-md-4 col-lg-4",
        "col-md-4 col-lg-4",
        "col-md-4 col-lg-4"
    ];

    $scope.tagline = 'Nothing beats a pocket protector!';

    this.enterQuantity = function(row){
        $scope.category[row] = true;
        $scope.donorContainer[row] = "col-md-6 col-lg-6";
    };

    this.submitQuantity = function(row) {
        var quantity = this.donationQuantitySpinner[row];

        //var donationQuantities = addQuantityToModel(row + 1, quantity);

        // Hides the current view
        $scope.category[row] = false;

        //console.dir(donationQuantities);
        Donate.submitQuantities(row + 1, quantity);
    };

    this.exitView = function(row) {
        $scope.category[row] = false;
    };



});
