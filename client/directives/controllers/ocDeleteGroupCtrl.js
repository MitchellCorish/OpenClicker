(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocDeleteGroupCtrl', ocDeleteGroupCtrl);
    
  ocDeleteGroupCtrl.$inject = ['$scope', '$reactive', 'GroupService'];
  
  function ocDeleteGroupCtrl($scope, $reactive, GroupService) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('groups');
    
    vm.delete = deleteGroup;
    
    vm.helpers({
      group: () => Groups.findOne({
        _id: vm.groupId
      })
    });
    
    function deleteGroup()
    {
      if (confirm('Are you sure you want to delete the group \"' + vm.group.name + '\"?'))
      {
        GroupService.deleteGroup(vm.group._id);
      }
    }
  }
})();