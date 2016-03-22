(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocUpdateGroupCtrl', ocUpdateGroupCtrl);
    
  ocUpdateGroupCtrl.$inject = ['$scope', '$reactive', 'GroupService'];
  
  function ocUpdateGroupCtrl($scope, $reactive, GroupService) {
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
      GroupService.updateGroup(vm.group);
    }
  }
})();