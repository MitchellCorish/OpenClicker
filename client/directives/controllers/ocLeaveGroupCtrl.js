(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocLeaveGroupCtrl', ocLeaveGroupCtrl);
    
  ocLeaveGroupCtrl.$inject = ['$scope', '$reactive', 'GroupMembershipService'];
  
  function ocLeaveGroupCtrl($scope, $reactive, GroupMembershipService) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('groups');
    
    vm.leave = leave;
    
    vm.helpers({
      group: () => Groups.findOne({
        _id: vm.groupId
      })
    });
    
    function leave()
    {
      if (confirm('Are you sure you want to leave the group \"' + vm.group.name + '\"?'))
      {
        GroupMembershipService.leaveGroup(vm.group._id);
      }
    }
  }
})();