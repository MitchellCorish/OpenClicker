(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('editRolesCtrl', editRolesCtrl);
    
  editRolesCtrl.$inject = ['$stateParams'];
  
  function editRolesCtrl($stateParams) {
    var vm = this;
    
    vm.userId = $stateParams.userId;
  }
})();
