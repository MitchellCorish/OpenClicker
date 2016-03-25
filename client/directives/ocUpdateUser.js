(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocUpdateUser', ocUpdateUser);
    
  ocUpdateUser.$inject = [];
  
  function ocUpdateUser() {
    var directive = {
      controller: 'ocUpdateUserCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/ocUpdateUser.html',
      restrict: 'E',
      scope: {},
      bindToController: true
    };
    
    return directive;
  }
})();