(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('updateGroupCtrl', updateGroupCtrl);
    
  updateGroupCtrl.$inject = ['$stateParams'];
  
  function updateGroupCtrl($stateParams) {
    var vm = this;
    
    vm.groupId = $stateParams.groupId;
  }
})();