(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocAskQuestionCtrl', ocAskQuestionCtrl);
    
  ocAskQuestionCtrl.$inject = ['$scope', '$reactive', 'QuestionService'];
  
  function ocAskQuestionCtrl($scope, $reactive, QuestionService) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('activeQuestions');
    
    vm.start = start;
    vm.stop = stop;
    vm.active = false;
    
    vm.helpers({
      question: () => Questions.findOne({
        _id: vm.questionId
      })
    });
    
    function start()
    {
      if (!vm.active)
      {
        vm.active = true;
        QuestionService.updateQuestionStartTime(vm.questionId, Math.floor(Date.now() / 1000));
        QuestionService.updateQuestionEndTime(vm.questionId, 0);
      }
    }
    
    function stop()
    {
      if (vm.active)
      {
        vm.active = false;
        QuestionService.updateQuestionEndTime(vm.questionId, Math.floor(Date.now() / 1000));
      }
    }
  }
})();