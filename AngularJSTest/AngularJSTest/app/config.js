define([], function () {
    function config($stateProvider) {
        $stateProvider
            .state('home', {
                url: '',
                component: 'home'
            });
    }

    config.$inject = ['$stateProvider'];

    console.log('config');

    return config;
});