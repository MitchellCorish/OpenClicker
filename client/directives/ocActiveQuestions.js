(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocActiveQuestions', ocActiveQuestions);
    
  ocActiveQuestions.$inject = [];
  
  function ocActiveQuestions() {
    var directive = {
      controller: 'ocActiveQuestionsCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocActiveQuestions.html',
      restrict: 'E',
      scope: {
        groupId: '@'
      },
      bindToController: true
    };
    
    return directive;
  }
})();