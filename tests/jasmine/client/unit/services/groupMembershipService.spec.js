'use strict';

describe('GroupMembershipService', function () {
  beforeEach(module('openClicker'));
  
  var service;
  var errorMessage = 'error message';
  
  // inject dependencies
  beforeEach(inject(function (GroupMembershipService) {
    service = GroupMembershipService;
  }));
  
  // set up
  beforeEach(function () {
    
    // spies that won't change between tests
    spyOn(console, 'log');
    spyOn(window, 'alert');
  });
  
  // test cases  
  describe('joinGroup()', function () {
    it('should call the joinGroup Meteor method', function () {
      var joinGroup = VelocityHelpers.spyOnMethod('joinGroup');
      
      service.joinGroup('testGroup');
      
      expect(joinGroup).toHaveBeenCalled();
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('joinGroup', { message: errorMessage }, null);

      service.joinGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('leaveGroup()', function () {
    it('should call the leaveGroup Meteor method', function () {
      var leaveGroup = VelocityHelpers.spyOnMethod('leaveGroup');
      
      service.leaveGroup('testGroup');
      
      expect(leaveGroup).toHaveBeenCalled();
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('leaveGroup', { message: errorMessage }, null);

      service.leaveGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
});