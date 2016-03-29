(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocAskQuestionCtrl', ocAskQuestionCtrl);
    
  ocAskQuestionCtrl.$inject = ['$scope', '$reactive', '$timeout', 'QuestionService'];
  
  function ocAskQuestionCtrl($scope, $reactive, $timeout, QuestionService) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('ownedQuestions');
    
    vm.active = false;
    vm.counter = 30;
    vm.endTime = -1;
    vm.usingTimer = false;
    vm.start = start;
    vm.stop = stop;
    vm.startTimer = startTimer;
    vm.onTimeout = onTimeout;
    
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
 
    function onTimeout() {
      if(vm.counter ===  0) {
        vm.endTime = (Math.floor(Date.now() / 1000) + vm.counter);
        QuestionService.updateQuestionEndTime(vm.questionId, vm.endTime);
        $timeout.cancel(questionTimeout);
        vm.counter = 30;
        vm.active = false;
        vm.usingTimer = false;
        return;
      }
      vm.counter--;
      questionTimeout = $timeout(vm.onTimeout, 1000);
    };
 
    function startTimer() {
      if (!vm.active)
      {
        vm.active = true;
        vm.usingTimer = true;
        
        questionTimeout = $timeout(vm.onTimeout, 1000);
        vm.startTime = Math.floor(Date.now() / 1000);
        
        QuestionService.updateQuestionStartTime(vm.questionId, vm.startTime);
        QuestionService.updateQuestionEndTime(vm.questionId, 0);
      }
    };
  }
})();