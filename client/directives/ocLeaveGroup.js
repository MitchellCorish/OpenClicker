(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocLeaveGroup', ocLeaveGroup);
    
  ocLeaveGroup.$inject = [];
  
  function ocLeaveGroup() {
    var directive = {
      controller: 'ocLeaveGroupCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/ocLeaveGroup.html',
      restrict: 'E',
      scope: {
        groupId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();