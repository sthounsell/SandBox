define([], function () {
    'use strict';

    //var module = angular.module('testApp');

    //console.log(module);

    //angular.module('testApp').controller('testService', function ($http) {
    //    return {
    //        callApi: function () {
    //            var urlBase = '/api/test';
    //            return $http.get(urlBase);
    //        },
    //        serviceResult: function () {
    //            return 'Test service result';
    //        }
    //    };
    //});

    ////testApp.factory('testService', ['$http', function ($http) {
    ////    console.log('Test from service.js');

    ////    return {
    ////        callApi: function () {
    ////            var urlBase = '/api/test';
    ////            return $http.get(urlBase);
    ////        },
    ////        serviceResult: function () {
    ////            return 'Test service result';
    ////        }
    ////    };
    ////}]);





    console.log('Test from service.js');

    function service($http) {
        var svc = {
            callApi: callApi,
            serviceResult: serviceResult
        };

        return svc;

        function callApi() {
            var urlBase = '/api/test';
            return $http.get(urlBase);
        }

        function serviceResult() {
            return 'Test service result';
        }
    }

    service.$inject = ['$http'];

    return service;
});