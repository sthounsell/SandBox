define([
    'config',
    'services/service'
],
    function (config, service) {
        'use strict';

        var app = angular.module('testApp', [
            'ngMaterial',
            'ngMessages',
            'ngRoute',
            'ui.router'
        ]);

        app.config(config);
        app.factory('testService', service);
    }
);