(function () {
  'use strict';
  
  angular
    .module('openClicker')
    .factory('GroupMembershipService', GroupMembershipService);
  
  GroupMembershipService.$inject = [];
  
  function GroupMembershipService() {
    var service = {
      joinGroup: joinGroup,
      leaveGroup: leaveGroup
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
  }
})();