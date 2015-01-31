angular.module('DonateCtrl', []).controller('DonateController', function($scope) {
    this.category = 0; // 1 Clothes, 2 Toys, 3 Food

	$scope.tagline = 'Nothing beats a pocket protector!';

    this.clothes = function(){
        this.category = 1;
    }

    this.toys = function(){
        this.category = 2;
    }

    this.food = function(){
        this.category = 3; // Food
    }

    this.categoryName = function(){
        var name;
        switch(this.category){
            case 1: 
                name = "Clothes";
                break;
            case 2:
                name = "Toys";
                break;
            case 3:
                name = "Food";
                break;
            default:
                name = "Not set";
        }
        return name;
    }

});