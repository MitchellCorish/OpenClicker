(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocPullQuizes', ocPullQuizes);
    
  ocPullQuizes.$inject = [];
  
  function ocPullQuizes() {
    var directive = {
      controller: 'ocPullQuizesCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocPullQuizes.html',
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