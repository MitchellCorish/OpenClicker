(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocUpdateUserCtrl', ocUpdateUserCtrl);
    
  ocUpdateUserCtrl.$inject = ['$scope', '$reactive', 'UserService',  '$state'];
  
  function ocUpdateUserCtrl($scope, $reactive, UserService, $state) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.update = update;
    
    vm.helpers({
      user: () => Meteor.user()
    });
    
    function update()
    {
        if (vm.user.username.trim().length == 0)
        {
            alert('Please enter a name for the user');
        }
        else
        {
            UserService.updateUser(vm.user, function () {
                $state.go('home');
            }, function () {
                alert('Failed to update group.');
            });
        } 
    }
  }
})();