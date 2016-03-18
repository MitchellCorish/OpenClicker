(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .factory('GroupService', GroupService);
  
  GroupService.$inject = [];
  
  function GroupService() {
    var service = {
      createGroup: createGroup,
      updateGroup: updateGroup,
      deleteGroup: deleteGroup
    }
    
    return service;
    
    function createGroup(groupName, success, failure) {
      Meteor.call('createGroup', groupName, function (error, result) {
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
    
    function updateGroup(group, success, failure) {
      Meteor.call('updateGroup', group, function (error, result) {
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
    
    function deleteGroup(groupId) {
      Meteor.call('deleteGroup', groupId, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
  }
})();