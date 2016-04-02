(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocGroupSummaryCtrl', ocGroupSummaryCtrl);
    
  ocGroupSummaryCtrl.$inject = ['$scope', '$reactive', '$state'];
  
  function ocGroupSummaryCtrl($scope, $reactive, $state) {
    var vm = this;
    var name = '8DJTLLQBn6LNjGCTY';
    $reactive(vm).attach($scope);
    
    vm.subscribe('usersInGroup', () => [vm.groupId]);
    vm.subscribe('groups');
    
    vm.helpers({
      users: () => Users.find({
          _id: {$ne: Meteor.userId()}
      }),
      group: () => Groups.findOne({
        _id: vm.groupId
      })
    });
    }
})();
 