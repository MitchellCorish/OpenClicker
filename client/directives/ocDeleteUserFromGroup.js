(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocDeleteUserFromGroup', ocDeleteUserFromGroup);
    
  ocDeleteUserFromGroup.$inject = [];
  
  function ocDeleteUserFromGroup() {
    var directive = {
      controller: 'ocDeleteUserFromGroupCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocDeleteUserFromGroup.html',
      restrict: 'E',
      scope: {
        userId: '@',  
        groupId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();