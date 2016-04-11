(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('activeQuestionsCtrl', activeQuestionsCtrl);
    
  activeQuestionsCtrl.$inject = ['$stateParams'];
  
  function activeQuestionsCtrl($stateParams) {
    var vm = this;

    vm.groupId = $stateParams.groupId;
  }
})();
