(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocCreateGroupCtrl', ocCreateGroupCtrl);
    
  ocCreateGroupCtrl.$inject = ['GroupService'];
  
  function ocCreateGroupCtrl(GroupService) {
    var vm = this;
    
    vm.groupName = '';
    vm.create = create;
    
    function create()
    {
      if (vm.groupName.trim().length == 0)
      {
        alert('Please enter a name for the group');
      }
      else
      {
        GroupService.createGroup(vm.groupName);
      }
    }
  }
})();