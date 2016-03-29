(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocAskQuestion', ocAskQuestion);
    
  ocAskQuestion.$inject = [];
  
  function ocAskQuestion() {
    var directive = {
      controller: 'ocAskQuestionCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/ocAskQuestion.html',
      restrict: 'E',
      scope: {
        questionId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();