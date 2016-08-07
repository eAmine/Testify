(function() {
    'use strict';

    angular
        .module('testifyApp')
        .directive('compteur', compteur);
    compteur.$inject=['$timeout','dateFilter'];
    function compteur($timeout,dateFilter){
        var directive = {
            restrict: 'E',

            scope:{
                duree:'='

            },
            templateUrl: '/app/components/compteur/compteur.html',
            link : function($scope,elem,attrs){
                $scope.buttonClass=null;
                $scope.demarrerCompteARebours=function() {
                    var stopped;

                    var compteARebours = function () {
                        stopped = $timeout(function () {
                            $scope.duree--;
                            compteARebours();

                            if($scope.duree <= 15 && $scope.duree > 5){
                                $scope.buttonClass = "btn-warning";
                            }
                            else if($scope.duree <= 5){
                                $scope.buttonClass = "btn-danger";
                            }
                            else{
                                $scope.buttonClass = "btn-success";
                            }

                            if ($scope.duree === 0) {
                                $scope.$emit('dureeTerminee', {
                                });
                            }
                        }, 1000);
                    };
                    compteARebours();
                }
                $scope.demarrerCompteARebours();
        }

    };
        return directive;
    }


})();