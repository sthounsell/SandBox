define([], function () {
    function config($ocLazyLoadProvider, $stateProvider) {
        $ocLazyLoadProvider.config({
            debug: true
        });

        $stateProvider
            .state('test', {
                url: '',
                //templateUrl: 'app/views/body.html',
                //controller: 'testController',
                component: 'testComponent',
                resolve: {
                    load: function ($ocLazyLoad) {
                        return $ocLazyLoad.load('app/components/testComponent/test.js');
                    }
                }
            });
    }

    config.$inject = ['$ocLazyLoadProvider', '$stateProvider'];

    console.log('config');

    return config;
});