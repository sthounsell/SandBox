require.config({
    paths: {
        app: 'app',
        angular: '../Scripts/angular',
        'angular-animate': '../Scripts/angular-animate.min',
        'angular-aria': '../Scripts/angular-aria.min',
        'angular-messages': '../Scripts/angular-messages.min',
        'angular-material': '../Scripts/angular-material.min',
        'angular-route': '../Scripts/angular-route.min',

        'ui-router': '../Scripts/angular-ui-router.min'
    },
    shim: {
        'angular': { exports: 'angular' },
        'angular-material': { deps: ['angular', 'angular-animate', 'angular-messages', 'angular-aria'] },
        'angular-messages': { deps: ['angular'] },
        'angular-animate': { deps: ['angular'] },
        'angular-aria': { deps: ['angular'] },
        'angular-route': { deps: ['angular'] },

        'ui-router': { deps: ['angular'] }
    }
});

require([
    'app'
], function () {
    'use strict';

    console.log('Before bootstrap');
    angular.bootstrap(document, ['testApp']);
    console.log('After bootstrap');
});