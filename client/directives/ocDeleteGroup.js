(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocDeleteGroup', ocDeleteGroup);
    
  ocDeleteGroup.$inject = [];
  
  function ocDeleteGroup() {
    var directive = {
      controller: 'ocDeleteGroupCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocDeleteGroup.html',
      restrict: 'E',
      scope: {
        groupId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();