define([
    'config',
    'services/service',
    'controllers/controller',
    'angular-route'
],
    function (config, service, controller) {
        'use strict';

        console.log('Test from app.js');

        var app = angular.module('testApp', [
            'ngRoute'
        ]);

        app.config(config);
        app.factory('testService', service);
        app.controller('testController', controller)
            .component('controller', {
                templateUrl: '../app/views/body.html',
                controller: 'testController as vm'
            });
    });