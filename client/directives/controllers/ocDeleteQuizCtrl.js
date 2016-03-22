(function () {
    'use-strict';

    angular
        .module('openClicker')
        .controller('ocDeleteQuizCtrl', ocDeleteQuizCtrl);

    ocDeleteQuizCtrl.$inject = ['$scope', '$reactive', 'QuizService'];

    function ocDeleteQuizCtrl($scope, $reactive, QuizService) {
        var vm = this;
        $reactive(vm).attach($scope);

        vm.subscribe('ownedQuizes');
        vm.subscribe('questions');
        vm.subscribe('ownedQuestions');

        vm.delete = deleteQuiz;

        vm.helpers({
                quiz: () => Quizes.findOne({
                _id: vm.quizId
            })
    });

        function deleteQuiz()
        {
            if (confirm('Are you sure you want to delete the quiz \"' + vm.quiz.name + '\"?'))
            {
                QuizService.deleteQuiz(vm.quiz._id);
            }
        }
    }
})();