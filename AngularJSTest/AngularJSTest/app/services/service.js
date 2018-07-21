angular.module('testApp.services', []).
    factory('testService', function () {
        var testService = {};

        testService.test = function () {
            return 'test value';
        };

        return testService;
    });