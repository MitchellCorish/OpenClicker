(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocCreateQuestionCtrl', ocCreateQuestionCtrl);
    
  ocCreateQuestionCtrl.$inject = ['$scope', '$reactive', 'QuestionService'];
  
  function ocCreateQuestionCtrl($scope, $reactive, QuestionService) {
    var vm = this;
    vm.create = create;
    $reactive(vm).attach($scope);
       
       
       
    vm.groupId = 0;   
    vm.question = '';    
    vm.answers = [{answer: 'answer1'},{answer: 'answer2'}];
    vm.correctAnswer = '';
        
    vm.addNewAnswer = function() {
        var newItemNo = vm.answers.length+1;
        vm.answers.push({'answer': 'answer'+newItemNo});
    };
        
    vm.removeAnswer = function() {
        var lastItem = vm.answers.length-1;
        vm.answers.splice(lastItem);
    };
    
         
    function create()
    {
      stringAnswers = [''];
      for(var i = 0; i < vm.answers.length; i++)
      {
         stringAnswers[i] = vm.answers[i].answer;
      }
       
     // console.log(vm.stringAnswers.toString());
        
      QuestionService.createQuestion(vm.groupId, vm.question, stringAnswers, vm.correctAnswer);
    }
  }
})();
