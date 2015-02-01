angular.module('DonateCtrl', []).controller('DonateController', function($scope, $http) {
    var donationQuantities = {
    }; // 1 Clothes, 2 Toys, 3 Food

    $scope.category = [
        false,
        false,
        false
    ];

    this.itemQuantity = 0;

    this.donationQuantitySpinner = [0, 0, 0];

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

        var donationQuantities = addQuantityToModel(row + 1, quantity);

        // Hides the current view
        $scope.category[row] = false;

        //console.dir(donationQuantities);
        submitDonation(donationQuantities);
    };

    this.exitView = function(row) {
        $scope.category[row] = false;
    };

    function addQuantityToModel(row, quantity){
        var donationItem = {
            clothes: 0,
            toys: 0,
            food: 0
        };
        switch(row){
            case 1:
                donationItem.clothes = +quantity;
                break;
            case 2:
                donationItem.toys = +quantity;
                break;
            case 3:
                donationItem.foods = +quantity;
                break;
        }
        console.log(donationItem);
        return donationItem;
    }

    function submitDonation(donationQuantities) {
        $http.post('/submitItems/' + 1, donationQuantities)
            .success(function(data) {
            //$scope.formData = {}; // clear the form so our user is ready to enter another
            //$scope.todos = data;
            console.dir(data);
        });
    }

});
