(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('answerQuestionCtrl', answerQuestionCtrl);
    
  answerQuestionCtrl.$inject = ['$stateParams'];
  
  function answerQuestionCtrl($stateParams) {
    var vm = this;
    
    vm.questionId = $stateParams.questionId;
  }
})();