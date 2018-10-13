define([], function () {
    function config($routeProvider) {
        $routeProvider
            .when('/', { templateUrl: 'app/views/body.html', controller: 'testController' })
            .when('/home', { templateUrl: 'templates/home.html', controller: 'ideasHomeController' })
            .when('/details/:id', { templateUrl: 'templates/ideaDetails.html', controller: 'ideaDetailsController' })
            .otherwise({ redirectTo: '/home' });
    }
    config.$inject = ['$routeProvider'];

    console.log('config');

    return config;
});