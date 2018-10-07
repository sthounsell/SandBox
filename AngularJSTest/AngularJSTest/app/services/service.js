define([
    'angular'
], function (testApp) {
    'use strict';

    console.log('Test from service.js');

    //function testService($http) {
    //    var testService = {};
    //    var urlBase = '/api/test';

    //    testService.callApi = function () {
    //        //return $http.get(urlBase);
    //    };
    //};

    function testService() {
        return 'test';
    }

    //return testService;
    return testService;
});