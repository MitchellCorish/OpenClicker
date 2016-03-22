(function () {
    'use-strict';

    angular
        .module('openClicker')
        .controller('ocCreateQuizCtrl', ocCreateQuizCtrl);

    ocCreateQuizCtrl.$inject = ['QuizService', '$state'];

    function ocCreateQuizCtrl(QuizService, $state) {
        var vm = this;

        vm.quizName = '';
        vm.create = create;

        function create()
        {
            if (vm.quizName.trim().length == 0)
            {
                alert('Please enter a name for the quiz');
            }
            else
            {
                QuizService.createQuiz(vm.quizName, function () {
                    $state.go('home');
                }, function () {
                    alert('Failed to create quiz.');
                });
            }
        }
    }
})();