define([
    'angular'
], function (angular) {
    'use strict';

    angular.module('testApp')
        .component('testComponent', {
            templateUrl: 'app/components/testComponent/test.html',
            controller: ['$scope', testController]
        });

    function testController($scope) {
        this.$onInit = () => {
            console.log('Hello from test component controller!');
        };
    }
});