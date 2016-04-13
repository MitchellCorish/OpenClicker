(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('homeCtrl', homeCtrl);
    
  homeCtrl.$inject = ['$scope', '$reactive'];
  
  function homeCtrl($scope, $reactive) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.helpers({
      isAdmin: () => {
        return Roles.userIsInRole(Meteor.userId(), ADMIN_ROLE, Roles.GLOBAL_GROUP);
      },
      isProfessor: () => {
        return Roles.userIsInRole(Meteor.userId(), PROFESSOR_ROLE, Roles.GLOBAL_GROUP);
      },
      isStudent: () => {
        return Roles.userIsInRole(Meteor.userId(), STUDENT_ROLE, Roles.GLOBAL_GROUP);
      }
    });
  }
})();