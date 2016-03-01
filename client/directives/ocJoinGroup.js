(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocJoinGroup', ocJoinGroup);
    
  ocJoinGroup.$inject = [];
  
  function ocJoinGroup() {
    var directive = {
      controller: 'ocJoinGroupCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/ocJoinGroup.html',
      restrict: 'E',
      scope: {},
      bindToController: true
    };
    
    return directive;
  }
})();