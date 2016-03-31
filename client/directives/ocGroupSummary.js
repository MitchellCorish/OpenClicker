(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocGroupSummary', ocGroupSummary);
    
  ocGroupSummary.$inject = [];
  
  function ocGroupSummary() {
    var directive = {
      controller: 'ocGroupSummaryCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/ocGroupSummary.html',
      restrict: 'E',
      scope: {
          groupId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();