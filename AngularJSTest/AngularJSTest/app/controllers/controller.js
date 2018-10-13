define([], function () {
    'use strict';

    console.log('Test from controller');

    function testController ($scope, testService) {
        $scope.Message = 'Hello World!';

        $scope.serviceResult = testService.serviceResult();

        testService.callApi().then(function (result) {
            $scope.apiResult = result.data;
        });
    }

    testController.$inject = ['$scope', 'testService'];

    return testController;
});