(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .factory('UserService', UserService);
  
  UserService.$inject = [];
  
  function UserService() {
    var service = {
      updateUser: updateUser,
    }
    
    return service;
    
    function updateUser(user, success, failure) {
      Meteor.call('updateUser', user, function (error, result) {
        if (error)
        {
          console.log(error.message);
          
          if (failure && typeof(failure) == 'function')
          {
            failure();
          }
        }
        else if (result)
        {
          if (success && typeof(success) == 'function')
          {
            success();
          }
        }
        else
        {
          if (failure && typeof(failure) == 'function')
          {
            failure();
          }
        }
      });
    }
  }
})();