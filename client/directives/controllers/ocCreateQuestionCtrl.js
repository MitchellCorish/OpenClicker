(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocCreateQuestionCtrl', ocCreateQuestionCtrl);
    
  ocCreateQuestionCtrl.$inject = ['$scope', '$reactive', 'QuestionService', '$state'];
  
  function ocCreateQuestionCtrl($scope, $reactive, QuestionService, $state) {
    var vm = this;
    vm.create = create;
    $reactive(vm).attach($scope);
       
       
         
    vm.question = '';    
    vm.answers = [{answer: ''},{answer: ''}];
    vm.correctAnswer = null;
        
    vm.addNewAnswer = function() {
        var newItemNo = vm.answers.length+1;
        vm.answers.push({'answer': ''});
    };
        
    vm.removeAnswer = function() {
        var lastItem = vm.answers.length-1;
        vm.answers.splice(lastItem);
        if (vm.correctAnswer && vm.correctAnswer == lastItem)
        {
          vm.correctAnswer = null;
        }
    };
    
         
    function create()
    {
      stringAnswers = [''];
      for(var i = 0; i < vm.answers.length; i++)
      {
         stringAnswers[i] = vm.answers[i].answer;
      }
      
      if(vm.correctAnswer == null)
      {
          alert("Please select the correct answer");
      }
      else if (vm.answers.length == 0 || vm.answers.length == 1) 
      {
          alert("You need at least 2 answers")
      }  
      else
      {
          QuestionService.createQuestion(vm.quizId, vm.groupId, vm.question, stringAnswers, vm.correctAnswer, function () {
          $state.go('ownedQuestions', {quizId: vm.quizId, groupId: vm.groupId});
        }, function () {
          alert('Failed to create question.');
        });   
      }
    }
  }
})();
