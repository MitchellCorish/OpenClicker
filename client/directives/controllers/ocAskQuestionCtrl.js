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
    vm.subscribe('answersForQuestion', () => [vm.questionId]);
    
    vm.counter = 30;
    vm.endTime = -1;
    vm.usingTimer = false;
    vm.displayingAnswers = false;
    vm.start = start;
    vm.stop = stop;
    vm.startTimer = startTimer;
    vm.onTimeout = onTimeout;
    vm.showCount = showCount;
    
    vm.helpers({
      question: () => Questions.findOne({
        _id: vm.questionId
      }),
      countAnswer: () => count(),
      totalAnswers: () => Answers.find({}).count()
    })
    
    function start()
    {
      if (!vm.question.active)
      {
        QuestionService.updateQuestionStartTime(vm.questionId, Math.floor(Date.now() / 1000));
        QuestionService.updateQuestionEndTime(vm.questionId, 0);
      }
    }
    
    function stop()
    {
      if (vm.question.active)
      {
        QuestionService.updateQuestionEndTime(vm.questionId, Math.floor(Date.now() / 1000));
      }
    }
 
    function onTimeout() {
      if(vm.counter ===  0) {
        vm.endTime = (Math.floor(Date.now() / 1000) + vm.counter);
        QuestionService.updateQuestionEndTime(vm.questionId, vm.endTime);
        $timeout.cancel(questionTimeout);
        vm.counter = 30;
        vm.usingTimer = false;
        return;
      }
      vm.counter--;
      questionTimeout = $timeout(vm.onTimeout, 1000);
    };
 
    function startTimer() {
      if (!vm.question.active)
      {
        vm.usingTimer = true;
        
        questionTimeout = $timeout(vm.onTimeout, 1000);
        vm.startTime = Math.floor(Date.now() / 1000);
        
        QuestionService.updateQuestionStartTime(vm.questionId, vm.startTime);
        QuestionService.updateQuestionEndTime(vm.questionId, 0);
      }
    };
    
    function count(){
      var countAnswerList = [];
      var selectionLimit = 100; // assume an upper limit since question always seems to be undefined here
      for(var i = 0; i < selectionLimit; i++)
      {
        countAnswerList.push(
          Answers.find({
            answer: i
          }).count()
        )
      }
      return countAnswerList;
    };
    
    function showCount(){
      if (!vm.displayingAnswers && confirm('Are you sure you want to display the count for each selection?'))
      {
        vm.displayingAnswers = true;
      }
    }
  }
})();