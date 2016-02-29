(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocOwnedGroups', ocOwnedGroups);
    
  ocOwnedGroups.$inject = [];
  
  function ocOwnedGroups() {
    var directive = {
      controller: 'ocOwnedGroupsCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/ocOwnedGroups.html',
      restrict: 'E',
      scope: {},
      bindToController: true
    };
    
    return directive;
  }
})();