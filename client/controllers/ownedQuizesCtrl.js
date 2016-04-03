(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ownedQuizesCtrl', ownedQuizesCtrl);
    
  ownedQuizesCtrl.$inject = ['$stateParams'];
  
  function ownedQuizesCtrl($stateParams) {
    var vm = this;
    
    vm.groupId = $stateParams.groupId;
  }
})();
