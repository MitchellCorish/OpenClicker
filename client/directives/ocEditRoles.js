(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocEditRoles', ocEditRoles);
    
  ocEditRoles.$inject = [];
  
  function ocEditRoles() {
    var directive = {
      controller: 'ocEditRolesCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/ocEditRoles.html',
      restrict: 'E',
      scope: {
        userId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();