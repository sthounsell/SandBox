define([
    'angular'
], function () {
    'use strict';

    angular.module('testApp')
        .component('testComponent', {
            templateUrl: 'components/testComponent/test.html',
            controller: testController
        });

    function testController() {

    }
});