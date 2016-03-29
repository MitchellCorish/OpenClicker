(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .factory('RolesService', RolesService);
  
  RolesService.$inject = [];
  
  function RolesService() {
    var service = {
      updateRoles: updateRoles
    }
    
    return service;
    
    function updateRoles(userId, student, professor, admin, success, failure) {
      Meteor.call('updateRoles', userId, student, professor, admin, function (error, result) {
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