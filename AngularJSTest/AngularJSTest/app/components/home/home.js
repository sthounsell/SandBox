define([
    'components/test/test'
], function () {
    'use strict';

    angular.module('testApp.home', ['testApp.test'])
        .component('home', {
            templateUrl: 'app/views/home.html',
            controller: ['$scope', 'testService', testController]
        });

    function testController($scope, testService) {
        'use strict';

        this.$onInit = () => {
            console.log('Hello from home component controller!');
        };

        console.log('Test from controller');

        $scope.Message = 'Hello World!';

        $scope.serviceResult = testService.serviceResult();

        testService.callApi().then(function (result) {
            $scope.apiResult = result.data;
        });
    }
});