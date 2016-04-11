(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ownedQuestionsCtrl', ownedQuestionsCtrl);
    
  ownedQuestionsCtrl.$inject = ['$stateParams'];
  
  function ownedQuestionsCtrl($stateParams) {
    var vm = this;
    
    vm.quizId = $stateParams.quizId;
    vm.groupId = $stateParams.groupId;
  }
})();
