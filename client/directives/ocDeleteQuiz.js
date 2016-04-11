(function () {
    'use strict';

    angular
        .module('openClicker')
        .directive('ocDeleteQuiz', ocDeleteQuiz);

    ocDeleteQuiz.$inject = [];

    function ocDeleteQuiz() {
        var directive = {
            controller: 'ocDeleteQuizCtrl',
            controllerAs: 'vm',
            templateUrl: 'client/templates/directives/ocDeleteQuiz.html',
            restrict: 'E',
            scope: {
                quizId: '@'
            },
            bindToController: true
        };

        return directive;
    }
})();