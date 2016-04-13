(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocUpdateGroupCtrl', ocUpdateGroupCtrl);
    
  ocUpdateGroupCtrl.$inject = ['$scope', '$reactive', 'GroupService', '$state'];
  
  function ocUpdateGroupCtrl($scope, $reactive, GroupService, $state) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('groups');
    
    vm.update = update;
    
    vm.helpers({
      group: () => Groups.findOne({
        _id: vm.groupId
      })
    });
    
    function update()
    {
      if (vm.group.name.trim().length == 0)
      {
        alert('Please enter a name for the group');
      }
      else
      {
        GroupService.updateGroup(vm.group, function () {
          $state.go('home');
        }, function () {
          alert('Failed to update group.');
        });
      }
    }
  }
})();