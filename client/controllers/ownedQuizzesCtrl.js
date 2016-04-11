(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ownedQuizzesCtrl', ownedQuizzesCtrl);
    
  ownedQuizzesCtrl.$inject = ['$stateParams'];
  
  function ownedQuizzesCtrl($stateParams) {
    var vm = this;
    
    vm.groupId = $stateParams.groupId;
  }
})();
