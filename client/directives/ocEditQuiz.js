(function () {
    'use strict';

    angular
        .module('openClicker')
        .directive('ocEditQuiz', ocEditQuiz);

    ocEditQuiz.$inject = [];

    function ocEditQuiz() {
        var directive = {
            controller: 'ocEditQuizCtrl',
            controllerAs: 'vm',
            templateUrl: 'client/templates/directives/ocEditQuiz.html',
            restrict: 'E',
            scope: {
                quizId: '@'
            },
            bindToController: true
        };

        return directive;
    }
})();


