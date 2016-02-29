(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocOwnedGroupsCtrl', ocOwnedGroupsCtrl);
    
  ocOwnedGroupsCtrl.$inject = ['$scope', '$reactive'];
  
  function ocOwnedGroupsCtrl($scope, $reactive) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('groups');
    
    vm.helpers({
      groups: () => Groups.find({
        userId: Meteor.userId()
      })
    });
  }
})();