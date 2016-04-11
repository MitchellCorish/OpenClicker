(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocEditRolesCtrl', ocEditRolesCtrl);
    
  ocEditRolesCtrl.$inject = ['$scope', '$reactive', 'RolesService', '$state'];
  
  function ocEditRolesCtrl($scope, $reactive, RolesService, $state) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.isStudent = false;
    vm.isProfessor = false;
    vm.isAdmin = false;
    
    initializeRoles();
    
    vm.subscribe('userRoles', null, function () {
      // update the roles when the subscription is ready so that they display properly
      initializeRoles();
    });
    
    vm.update = update;
    
    vm.helpers({
      user: () => Users.findOne({
        _id: vm.userId
      })
    });
    
    function update() {
      RolesService.updateRoles(vm.userId, vm.isStudent, vm.isProfessor, vm.isAdmin, function () {
        $state.go('home');
      }, function () {
        alert('Failed to update user roles.');
      });
    }
    
    function initializeRoles() {
      vm.isStudent = Roles.userIsInRole(vm.userId, STUDENT_ROLE, Roles.GLOBAL_GROUP);
      vm.isProfessor = Roles.userIsInRole(vm.userId, PROFESSOR_ROLE, Roles.GLOBAL_GROUP);
      vm.isAdmin = Roles.userIsInRole(vm.userId, ADMIN_ROLE, Roles.GLOBAL_GROUP);
    }
  }
})();