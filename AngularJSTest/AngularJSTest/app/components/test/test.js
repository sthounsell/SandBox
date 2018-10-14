define([], function () {
    'use strict';

    angular.module('testApp.test', [])
        .component('testComponent', {
            templateUrl: 'app/components/test/test.html',
            controller: ['$scope', 'testService', testController]
        });

    function testController($scope) {
        'use strict';

        this.$onInit = () => {
            console.log('Hello from test component controller!');
        };
    }
});