define([], function () {

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'index.html',
                controller: 'testController'
            })
            .otherwise({
                redirectTo: 'index.html'
            });
    }

    return config;
});