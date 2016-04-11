(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('createQuestionCtrl', createQuestionCtrl);
    
  createQuestionCtrl.$inject = ['$stateParams'];
  
  function createQuestionCtrl($stateParams) {
    var vm = this;
    vm.quizId = $stateParams.quizId;
    vm.groupId = $stateParams.groupId;
  }
})();
