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
      spyOn(Meteor, 'call');
      
      service.joinGroup('testGroup');
      
      expect(Meteor.call).toHaveBeenCalledWith('joinGroup', 'testGroup', jasmine.any(Function));
    });
    
    it('should print errors to the console', function () {      
      spyOn(Meteor, 'call').and.callFake(function (method, groupName, callback) {
        callback({
          message: errorMessage
        }, null);
      });

      service.joinGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('leaveGroup()', function () {
    it('should call the leaveGroup Meteor method', function () {
      spyOn(Meteor, 'call');
      
      service.leaveGroup('testGroup');
      
      expect(Meteor.call).toHaveBeenCalledWith('leaveGroup', 'testGroup', jasmine.any(Function));
    });
    
    it('should print errors to the console', function () {      
      spyOn(Meteor, 'call').and.callFake(function (method, groupName, callback) {
        callback({
          message: errorMessage
        }, null);
      });

      service.leaveGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
});