(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocCounter', ocCounter);
    
  ocCounter.$inject = [];
  
  function ocCounter() {
    var directive = {
      controller: 'ocCounterCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/ocCounter.html',
      restrict: 'E',
      scope: {},
      bindToController: true
    };
    
    return directive;
  }
})();