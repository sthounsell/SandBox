angular.module('testApp.controllers', []).
    controller('testController', ['$scope', 'testService',
        function ($scope, testService) {
            $scope.Message = 'Hello World!';

            $scope.serviceResult = testService.test();

            testService.callApi().then(function (response) {
                $scope.apiResult = response.data;
            });
        }]);