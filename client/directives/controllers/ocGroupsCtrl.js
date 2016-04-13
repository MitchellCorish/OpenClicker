(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocGroupsCtrl', ocGroupsCtrl);
    
  ocGroupsCtrl.$inject = ['$scope', '$reactive'];
  
  function ocGroupsCtrl($scope, $reactive) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.groups = [];
    
    vm.subscribe('joinedGroups');
    
    vm.helpers({
      groups: () => Groups.find({}),
      userID: () => {
        return Meteor.userId();
      },
    });
  }
})();