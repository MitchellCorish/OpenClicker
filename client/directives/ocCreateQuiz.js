(function () {
    'use strict';

    angular
        .module('openClicker')
        .directive('ocCreateQuiz', ocCreateQuiz);

    ocCreateQuiz.$inject = [];

    function ocCreateQuiz() {
        var directive = {
            controller: 'ocCreateQuizCtrl',
            controllerAs: 'vm',
            templateUrl: 'client/templates/ocCreateQuiz.html',
            restrict: 'E',
            scope: {
                groupId: '@'
            },
            bindToController: true
        };

        return directive;
    }
})();