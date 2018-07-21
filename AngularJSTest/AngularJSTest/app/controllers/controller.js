angular.module('testApp.controllers', []).
    controller('testController', ['$scope',
        function ($scope) {
            $scope.Message = 'Hello World!';
        }]);