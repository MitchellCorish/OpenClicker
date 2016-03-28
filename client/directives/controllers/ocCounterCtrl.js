(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocCounterCtrl', ocCounterCtrl);
    
  ocCounterCtrl.$inject = ['$scope', '$reactive', '$timeout', 'QuestionService'];
  
  function ocCounterCtrl($scope, $reactive, $timeout, QuestionService) {
    var vm = this;
    vm.startTimer = startTimer;
    vm.onTimeout = onTimeout;
    vm.endTime = 123;
    
    $reactive(vm).attach($scope);
    
    vm.subscribe('ownedQuestions');
    
    
    vm.counter = 30;
    
    var mytimeout = null; 
 
    function onTimeout() {
        if(vm.counter ===  0) {
            vm.endTime = (Math.floor(Date.now() / 1000) + vm.counter);
            QuestionService.updateQuestionEndTime(vm.questionId, vm.endTime);
            $timeout.cancel(questionTimeout);
            return;
        }
       vm.counter--;
        questionTimeout = $timeout(vm.onTimeout, 1000);
    };
 
    function startTimer() {
        questionTimeout = $timeout(vm.onTimeout, 1000);
        vm.startTime = Math.floor(Date.now() / 1000);
        
        QuestionService.updateQuestionStartTime(vm.questionId, vm.startTime);
        QuestionService.updateQuestionEndTime(vm.questionId, 0);
        
    };    
  }
})();