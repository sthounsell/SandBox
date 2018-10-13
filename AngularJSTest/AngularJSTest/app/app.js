define([
    'config',
    'services/service',
    'controllers/controller'
],
    function (config, service, controller) {
        'use strict';

        var app = angular.module('testApp', [
            'ngMaterial',
            'ngMessages',
            'ngRoute',
            'ui.router',
            'oc.lazyLoad'
        ]);

        app.config(config);
        app.controller('testController', controller);
        app.factory('testService', service);
    }
);