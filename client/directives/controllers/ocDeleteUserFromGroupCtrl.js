(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocDeleteUserFromGroupCtrl', ocDeleteUserFromGroupCtrl);
    
  ocDeleteUserFromGroupCtrl.$inject = ['$scope', '$reactive', 'GroupMembershipService'];
  
  function ocDeleteUserFromGroupCtrl($scope, $reactive, GroupMembershipService) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('usersInGroup', () => [vm.groupId]);
    vm.subscribe('groups');
    
    vm.delete = deleteUser;
    
    vm.helpers({
      group: () => Groups.findOne({
        _id: vm.groupId
      }),
      user: () => Users.findOne({
        _id: vm.userId
      })
    });
    
    function deleteUser()
    {
      if (confirm('Are you sure you want to delete \"' + vm.user.username + '\" from the group \"' + vm.group.name + '\"?'))
      {
        GroupMembershipService.deleteUserFromGroup(vm.user._id, vm.groupId);
      }
    }
  }
})();