(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocCreateQuestion', ocCreateQuestion);
    
  ocCreateQuestion.$inject = [];
  
  function ocCreateQuestion($scope) {
    var directive = {
      controller: 'ocCreateQuestionCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocCreateQuestion.html',
      restrict: 'E',
      scope: {
        questionId: '@'
        
      },
      bindToController: true
    };
    
    return directive;
  }
})();