define([
    'angular',
    'app'
], function (angular, app) {
    'use strict';

    console.log('Test from controller');
    //app.controller('testController', testController)

    function testController ($scope) {
        $scope.Message = 'Hello World!';

        //testService.callApi().then(function (response) {
        //    $scope.apiResult = response.data;
        //});
    }

    testController.$inject = ['$scope'];

    return testController;
});