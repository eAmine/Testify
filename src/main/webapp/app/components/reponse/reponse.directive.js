(function() {
    'use strict';

    angular
        .module('testifyApp')
        .directive('reponse', question);

    function question(){
        var directive = {
            restrict: 'E',
            templateUrl: '/app/components/reponse/reponse.html',
            link: linkFunc
        };
        return directive;
    }
    function linkFunc($scope,elem,attrs){
        $scope.selectReponse=function(reponse){
            if(angular.isUndefined(reponse.selected)) {
                reponse.selected = true;
            }
            else{
                delete reponse['selected'];
            }
            $scope.$emit('activeReponseUpdated',{
                activeReponse:reponse
            });
        }
    }


})();