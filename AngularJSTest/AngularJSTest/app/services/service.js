angular.module('testApp.services', []).
    factory('testService', function ($http) {
        var testService = {};
        var urlBase = '/api/test';

        testService.test = function () {
            return 'test value';
        };

        testService.callApi = function () {
            return $http.get(urlBase);
        };

        return testService;
    });