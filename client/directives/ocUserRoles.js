(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocUserRoles', ocUserRoles);
    
  ocUserRoles.$inject = [];
  
  function ocUserRoles() {
    var directive = {
      controller: 'ocUserRolesCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocUserRoles.html',
      restrict: 'E',
      scope: {},
      bindToController: true
    };
    
    return directive;
  }
})();