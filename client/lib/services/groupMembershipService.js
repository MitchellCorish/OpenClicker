(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .factory('GroupMembershipService', GroupMembershipService);
  
  GroupMembershipService.$inject = [];
  
  function GroupMembershipService() {
    var service = {
      joinGroup: joinGroup,
      leaveGroup: leaveGroup,
      deleteUserFromGroup: deleteUserFromGroup
    }
    
    return service;
    
    function joinGroup(groupId) {
      Meteor.call('joinGroup', groupId, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
    
    function leaveGroup(groupId) {
      Meteor.call('leaveGroup', groupId, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
    
    function deleteUserFromGroup(userId, groupId) {
      Meteor.call('deleteUserFromGroup', userId, groupId, function (error, result) {
        if (error)
        {
          console.log(error.message);
        }
      });
    }
  }
})();