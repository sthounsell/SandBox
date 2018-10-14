define([], function () {
    'use strict';

    angular.module('testApp.shoppingList', [])
        .component('shoppingList', {
            templateUrl: 'app/components/shoppingList/shoppingList.html',
            controller: ['$scope', shoppingListController]
        });

    function shoppingListController($scope) {
        $scope.products = ['Milk', 'Bread', 'Cheese'];

        $scope.addItem = function () {
            $scope.errortext = '';
            if (!$scope.addMe) { return; }
            if ($scope.products.indexOf($scope.addMe) === -1) {
                $scope.products.push($scope.addMe);
            } else {
                $scope.errortext = `${$scope.addMe} is already in your shopping list!`;
            }
        };

        $scope.removeItem = function (x) {
            $scope.errortext = '';
            $scope.products.splice(x, 1);
        };
    }
});