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
    
    vm.subscribe('groups');
    
    vm.helpers({
      groups: () => Groups.find({
        _id: {
          $in : Meteor.user().groups
        },
      }),
      userID: () => {
        return Meteor.userId();
      },
    });
  }
})();