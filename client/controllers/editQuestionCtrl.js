(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('editQuestionCtrl', editQuestionCtrl);
    
  editQuestionCtrl.$inject = ['$stateParams'];
  
  function editQuestionCtrl($stateParams) {
    var vm = this;
    vm.questionId = $stateParams.questionId;
  }
})();
