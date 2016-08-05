(function() {
    'use strict';

    angular
        .module("evaluation")
        .controller("themeController", themeController);

    themeController.$inject=['$scope','dataFactory','$timeout','$location'];


    function themeController($scope,dataFactory,$timeout,$location){

        var vm =this;

        vm.questionnaires=dataFactory.allData.evaluation.questionnaires;
        for(var i=0;i<vm.questionnaires.length;i++){
            if(vm.questionnaires[i].score!=null){
                vm.questionnaires[i].disabled=true;
            }
            else{
                vm.questionnaires[i].disabled=false;
            }
        }


        vm.demarrerTest=function(theme){
            $location.path('/evaluation/questionnaire/'+theme);
        }

    }

})();