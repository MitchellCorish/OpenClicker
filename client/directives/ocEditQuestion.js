(function () {
    'use strict';
 
    angular
        .module('openClicker')
        .directive('ocEditQuestion', ocEditQuestion);
 
    ocEditQuestion.$inject = [];
 
    function ocEditQuestion() {
        var directive = {
            controller: 'ocEditQuestionCtrl',
            controllerAs: 'vm',
            templateUrl: 'client/templates/ocEditQuestion.html',
            restrict: 'E',
            scope: {
                questionId: '@'
            },
            bindToController: true
        };
 
        return directive;
    }
})();