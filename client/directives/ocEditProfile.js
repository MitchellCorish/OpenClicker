(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .directive('ocEditProfile', ocEditProfile);
    
  ocEditProfile.$inject = [];
  
  function ocEditProfile() {
    var directive = {
      controller: 'ocEditProfileCtrl',
      controllerAs: 'vm',
      templateUrl: 'client/templates/ocEditProfile.html',
      restrict: 'E',
      scope: {},
      bindToController: true
    };
    
    return directive;
  }
})();