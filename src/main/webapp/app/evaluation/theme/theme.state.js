(function(){
    'use strict';

    angular
        .module('evaluation')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('evaluation', {
            parent: 'app',
            url: '/evaluation',
            data: {
                authorities: ['ROLE_USER']
            },
            views: {
                'content@': {
                    templateUrl: 'app/evaluation/theme/theme.html',

                }
            }
        });
    }

})();