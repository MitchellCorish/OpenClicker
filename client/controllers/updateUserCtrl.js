(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('updateUserCtrl', updateUserCtrl);
    
  updateUserCtrl.$inject = ['$stateParams'];
  
  function updateUserCtrl($stateParams) {
    var vm = this;
    
    vm.userId = $stateParams.userId;
  }
})();