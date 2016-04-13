(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocAnswerQuestion', ocAnswerQuestion);
    
  ocAnswerQuestion.$inject = [];
  
  function ocAnswerQuestion() {
    var directive = {
      controller: 'ocAnswerQuestionCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocAnswerQuestion.html',
      restrict: 'E',
      scope: {
        questionId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();