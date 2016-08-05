(function(){
    'use strict';

    angular
        .module('evaluation')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('questionnaire', {
            parent: 'evaluation',
            url: '/questionnaire/{theme}',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/evaluation/questionnaire/questionnaire.html',

                }
            }
        });
    }

})();