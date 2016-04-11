(function () {
  'use strict';

  angular
    .module('openClicker')
    .directive('ocOwnedQuizzes', ocOwnedQuizzes);

  ocOwnedQuizzes.$inject = [];

  function ocOwnedQuizzes() {
    var directive = {
      controller: 'ocOwnedQuizzesCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/directives/ocOwnedQuizzes.html',
      restrict: 'E',
      scope: {
          groupId: '@'
      },
      bindToController: true
    };

    return directive;
  }
})();