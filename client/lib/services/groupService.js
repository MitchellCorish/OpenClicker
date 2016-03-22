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
    
    function createGroup(groupName) {
      Meteor.call('createGroup', groupName, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
    
    function updateGroup(group) {
      Meteor.call('updateGroup', group, function (error, result) {
        if (error)
        {
          console.log(error.message);
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