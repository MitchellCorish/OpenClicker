(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocUpdateUserCtrl', ocUpdateUserCtrl);
    
  ocUpdateUserCtrl.$inject = ['$scope', '$reactive', 'UserService'];
  
  function ocUpdateUserCtrl($scope, $reactive, UserService) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('users');
    
    vm.update = update;
    
    vm.helpers({
      user: () => Users.findOne({
        _id: vm.userId
      })
    });
    
    function update()
    {
      UserService.updateUser(vm.user);
    }
  }
})();