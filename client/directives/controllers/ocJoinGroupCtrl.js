(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocJoinGroupCtrl', ocJoinGroupCtrl);
    
  ocJoinGroupCtrl.$inject = ['GroupMembershipService'];
  
  function ocJoinGroupCtrl(GroupMembershipService) {
    var vm = this;
    
    vm.groupId = '';
    vm.join = join;
    
    function join()
    {
      GroupMembershipService.joinGroup(vm.groupId);
    }
  }
})();