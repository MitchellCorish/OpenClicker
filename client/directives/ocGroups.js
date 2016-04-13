(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocGroups', ocGroups);
    
  ocGroups.$inject = [];
  
  function ocGroups() {
    var directive = {
      controller: 'ocGroupsCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocGroups.html',
      restrict: 'E',
      scope: {},
      bindToController: true
    };
    
    return directive;
  }
})();