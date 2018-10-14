define([
    'config',
    'services/service',
    'components/home/home'
],
    function (config, service) {
        'use strict';

        var app = angular.module('testApp', [
            'ngMaterial',
            'ui.router',
            'testApp.home'
        ]);

        app.config(config);
        app.factory('testService', service);
    }
);