(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocAnswerQuestionCtrl', ocAnswerQuestionCtrl);
    
  ocAnswerQuestionCtrl.$inject = ['$scope', '$reactive', 'QuestionAnswerService'];
  
  function ocAnswerQuestionCtrl($scope, $reactive, QuestionAnswerService) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('activeQuestions');
    
    vm.answer = answer;
    vm.selectedAnswer = null;
    
    
    
    vm.helpers({
      question: () => Questions.findOne({
        _id: vm.questionId
      })
    });
    
    function answer()
    {
      if (vm.selectedAnswer && vm.selectedAnswer >= 0 && vm.selectedAnswer < vm.question.possibleAnswers.length)
      {
        vm.timestamp = Math.floor(Date.now() / 1000);
        QuestionAnswerService.answerQuestion(vm.question._id, vm.selectedAnswer, vm.timestamp);
      }
      else
      {
        alert('Please select an answer.');
      }
    }
  }
})();