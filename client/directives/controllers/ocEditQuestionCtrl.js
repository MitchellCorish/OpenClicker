(function () {
    'use-strict';
 
    angular
        .module('openClicker')
        .controller('ocEditQuestionCtrl', ocEditQuestionCtrl);
 
    ocEditQuestionCtrl.$inject = ['$scope', '$reactive', 'QuestionService'];
 
    function ocEditQuestionCtrl($scope, $reactive, QuestionService) {
        var vm = this;
        $reactive(vm).attach($scope);
 
        vm.subscribe('ownedQuestions');
 
        vm.update = update;
        vm.removeAnswer = removeAnswer;
        vm.addAnswer = addAnswer;
        vm.helpers({
            question: () => Questions.findOne({
                _id: vm.questionId
            })
        });
 
        function update()
        {
            QuestionService.editQuestion(vm.question._id,
                vm.question.groupId, vm.question.questionAsked,
                vm.question.possibleAnswers, vm.question.answer);
        }
 
        function removeAnswer(i)
        {
            vm.question.possibleAnswers.splice(i,1);
 
        }

        function addAnswer(anAnswer)
        {
            vm.question.possibleAnswers.push(anAnswer);
        }
    }
})();