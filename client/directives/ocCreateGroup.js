(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocCreateGroup', ocCreateGroup);
    
  ocCreateGroup.$inject = [];
  
  function ocCreateGroup() {
    var directive = {
      controller: 'ocCreateGroupCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocCreateGroup.html',
      restrict: 'E',
      scope: {},
      bindToController: true
    };
    
    return directive;
  }
})();