(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocDeleteQuestion', ocDeleteQuestion);
    
  ocDeleteQuestion.$inject = [];
  
  function ocDeleteQuestion() {
    var directive = {
      controller: 'ocDeleteQuestionCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocDeleteQuestion.html',
      restrict: 'E',
      scope: {
        questionId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();