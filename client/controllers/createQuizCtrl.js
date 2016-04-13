(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('createQuizCtrl', createQuizCtrl);
    
  createQuizCtrl.$inject = ['$stateParams'];
  
  function createQuizCtrl($stateParams) {
    var vm = this;
    
    vm.groupId = $stateParams.groupId;
  }
})();
