(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocEditProfileCtrl', ocEditProfileCtrl);
    
  ocEditProfileCtrl.$inject = ['$scope', '$reactive'];
  
  function ocEditProfileCtrl($scope, $reactive) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('users');
    
    vm.helpers({
      isLoggedIn: () => {
        return Meteor.userId() !== null;
      },
      isVerified: () => {
        return Meteor.user() && Meteor.user().emails[0].verified;
      },
      userID: () => {
          return Meteor.userId();
      }
    });
  }
})();