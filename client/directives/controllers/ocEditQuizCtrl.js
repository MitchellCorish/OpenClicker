(function () {
    'use-strict';

    angular
        .module('openClicker')
        .controller('ocEditQuizCtrl', ocEditQuizCtrl);

    ocEditQuizCtrl.$inject = ['$scope', '$reactive', 'QuizService'];

    function ocEditQuizCtrl($scope, $reactive, QuizService) {
        var vm = this;
        $reactive(vm).attach($scope);

        vm.subscribe('ownedQuizes');

        vm.update = update;
        vm.up = up;
        vm.down = down;
        vm.removeQuestion = removeQuestion;
        vm.addQuestion = addQuestion;
        vm.helpers({
                quiz: () => Quizes.findOne({
                _id: vm.quizId
            })
    });

        function update()
        {
            QuizService.editQuiz(vm.quiz._id,vm.questions,vm.groupId,vm.name);
        }

        function up(i)
        {
            if(i > 0){
                temp = vm.quiz.questions[i];
                vm.quiz.questions[i] = vm.quiz.questions[i-1];
                vm.quiz.questions[i-1] = temp;
            }
        }

        function down(i)
        {
            if(i < vm.quiz.questions.length){
                temp = vm.quiz.questions[i];
                vm.quiz.questions[i] = vm.quiz.questions[i+1];
                vm.quiz.questions[i+1] = temp;
            }
        }

        function removeQuestion(i)
        {
            vm.quiz.questions.splice(i,1);

        }

        function addQuestion(q)
        {
            vm.quiz.questions.push(q);
        }
    }
})();