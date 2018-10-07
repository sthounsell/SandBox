define([
    'angular',
    'app',
    'services/service'
], function (angular, app) {
    'use strict';


    app.controller('testController', testController)

    function testController ($scope) {
        $scope.Message = 'Hello World!';

        //testService.callApi().then(function (response) {
        //    $scope.apiResult = response.data;
        //});
    };

    return testController;
});