(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocDeleteQuestionCtrl', ocDeleteQuestionCtrl);
    
  ocDeleteQuestionCtrl.$inject = ['$scope', '$reactive', 'QuestionService'];
  
  function ocDeleteQuestionCtrl($scope, $reactive, QuestionService) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('ownedQuestions');
    
    vm.delete = deleteQuestion;
    
    
    
    vm.helpers({
      question: () => Questions.findOne({
        _id: vm.questionId
      })
    });
    
    function deleteQuestion()
    {
      if (confirm('Are you sure you want to delete this question?'))
      {
        QuestionService.deleteQuestion(vm.question._id);
      }
    }
  }
})();