(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('welcomeCtrl', welcomeCtrl);
    
  welcomeCtrl.$inject = ['$scope', '$reactive'];
  
  function welcomeCtrl($scope, $reactive) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.helpers({
      isLoggedIn: () => {
        return Meteor.userId() !== null;
      },
      isVerified: () => {
        return Meteor.user() && Meteor.user().emails[0].verified;
      },
    });
  }
})();