(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocUserRolesCtrl', ocUserRolesCtrl);
    
  ocUserRolesCtrl.$inject = ['$scope', '$reactive'];
  
  function ocUserRolesCtrl($scope, $reactive) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('userRoles');
    
    vm.Roles = Roles;
    vm.STUDENT_ROLE = STUDENT_ROLE;
    vm.PROFESSOR_ROLE = PROFESSOR_ROLE;
    vm.ADMIN_ROLE = ADMIN_ROLE;
    
    vm.helpers({
      users: () => Users.find()
    });
  }
})();