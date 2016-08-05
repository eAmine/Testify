(function() {
    'use strict';

    angular
        .module("evaluation")
        .controller("themeController", themeController);

    themeController.$inject=['$scope','dataFactory','$timeout','$location'];


    function themeController($scope,dataFactory,$timeout,$location){

        var vm =this;

        vm.questionnaires=dataFactory.getQuestionnairesForTheme();



        vm.demarrerTest=function(theme){
            $location.path('/evaluation/questionnaire/'+theme);
        }

    }

})();