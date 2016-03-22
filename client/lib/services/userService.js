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
    
    function updateUser(user) {
      Meteor.call('updateUser', user, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
    
  }
})();