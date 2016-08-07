(function() {
    'use strict';

    angular
        .module("evaluation")
        .controller("questionnaireController", questionnaireController);

    questionnaireController.$inject=['$scope','dataFactory','$timeout','$location','$stateParams','$filter'];


    function questionnaireController($scope,dataFactory,$timeout,$location,$stateParams,$filter) {
        var vm = this;
        vm.questions = dataFactory.findQuestionsByTheme($stateParams.theme);
        //FIXME faire un seul appel au questionnaire et extraire les questions
        vm.questionnaire=dataFactory.findQuestionnaireByTheme($stateParams.theme);
        vm.activeQuestion = 0;
        vm.score=0;
        vm.activeReponses=[];
        vm.error = false;
        $scope.$on('activeReponseUpdated',function(event,args){
                vm.activeReponses.push(args.activeReponse);
        });
        $scope.$on('dureeTerminee',function(event,args){
            vm.validerReponse();
        });
        vm.validerReponse=function() {

                if (vm.activeQuestion < vm.questions.length - 1) {
                    vm.activeQuestion++;
                }
                else {
                    dataFactory.setQuestionnaireScore(vm.questionnaire, vm.activeReponses);
                    $location.path('/evaluation');
                }
        }
        

    }





})();
