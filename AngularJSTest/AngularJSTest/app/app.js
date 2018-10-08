define([
    'config',
    'controllers/controller',
    'services/service'
],
    function (config, controller, service) {
        var app = angular.module('testApp', [
            'ngMaterial',
            'ngMessages'
        ]);

        //app.config(config);
        app.controller('testController', controller);
        app.factory('testService', service);
    });