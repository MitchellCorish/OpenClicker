(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocUpdateGroup', ocUpdateGroup);
    
  ocUpdateGroup.$inject = [];
  
  function ocUpdateGroup() {
    var directive = {
      controller: 'ocUpdateGroupCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocUpdateGroup.html',
      restrict: 'E',
      scope: {
        groupId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();