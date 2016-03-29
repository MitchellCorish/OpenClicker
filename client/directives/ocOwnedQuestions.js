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
      templateUrl: 'client/templates/ocOwnedQuestions.html',
      restrict: 'E',
      scope: {},
      bindToController: true
    };
    
    return directive;
  }
})();