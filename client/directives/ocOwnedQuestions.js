(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocOwnedQuestions', ocOwnedQuestions);
    
  ocOwnedQuestions.$inject = [];
  
  function ocOwnedQuestions() {
    var directive = {
      controller: 'ocOwnedQuestionsCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocOwnedQuestions.html',
      restrict: 'E',
      scope: {
        quizId: '@',
        groupId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();