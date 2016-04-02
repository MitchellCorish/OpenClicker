(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('askQuestionCtrl', askQuestionCtrl);
    
  askQuestionCtrl.$inject = ['$stateParams'];
  
  function askQuestionCtrl($stateParams) {
    var vm = this;
    
    vm.questionId = $stateParams.questionId;
  }
})();