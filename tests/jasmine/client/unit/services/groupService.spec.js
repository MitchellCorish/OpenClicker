'use strict';

describe('GroupService', function () {
  beforeEach(module('openClicker'));
  
  var service;
  var errorMessage;
  var group;
  var success;
  var failure;
  
  // inject dependencies
  beforeEach(inject(function (GroupService) {
    service = GroupService;
  }));
  
  // set up
  beforeEach(function () {
    
    group = {
      _id: 'testGroup',
      userId: 'testUser',
      name: 'test group'
    };
    
    errorMessage = 'error message';
    
    // spies that won't change between tests
    spyOn(console, 'log');
    spyOn(window, 'alert');
    success = jasmine.createSpy('success');
    failure = jasmine.createSpy('failure');
  });
  
  // test cases  
  describe('createGroup()', function () {
    it('should call the createGroup Meteor method', function () {
      var createGroup = VelocityHelpers.spyOnMethod('createGroup');
      
      service.createGroup(group._id);
      
      expect(createGroup).toHaveBeenCalledWith(group._id);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('createGroup', { message: errorMessage }, null);

      service.createGroup(group._id);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
    
    it('should call the success callback when the createGroup Meteor method is successful', function () {
      VelocityHelpers.stubMethod('createGroup', null, true);
      
      service.createGroup(group._id, success, failure);
      
      expect(success).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the createGroup Meteor method is not successful', function () {
      VelocityHelpers.stubMethod('createGroup', null, false);
      
      service.createGroup(group._id, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the createGroup Meteor method throws an error', function () {
      VelocityHelpers.stubMethod('createGroup', { message: errorMessage }, null);
      
      service.createGroup(group._id, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
  });
  
  describe('updateGroup()', function () {
    it('should call the updateGroup Meteor method', function () {
      var updateGroup = VelocityHelpers.spyOnMethod('updateGroup');
      
      service.updateGroup(group);
      
      expect(updateGroup).toHaveBeenCalledWith(group);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('updateGroup', { message: errorMessage }, null);

      service.updateGroup(group);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
    
    it('should call the success callback when the updateGroup Meteor method is successful', function () {
      VelocityHelpers.stubMethod('updateGroup', null, true);
      
      service.updateGroup(group, success, failure);
      
      expect(success).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the updateGroup Meteor method is not successful', function () {
      VelocityHelpers.stubMethod('updateGroup', null, false);
      
      service.updateGroup(group, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the updateGroup Meteor method throws an error', function () {
      VelocityHelpers.stubMethod('updateGroup', { message: errorMessage }, null);
      
      service.updateGroup(group, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
  });
  
  describe('deleteGroup()', function () {
    it('should call the deleteGroup Meteor method', function () {
      var deleteGroup = VelocityHelpers.spyOnMethod('deleteGroup');
      
      service.deleteGroup(group._id);
      
      expect(deleteGroup).toHaveBeenCalledWith(group._id);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('deleteGroup', { message: errorMessage }, null);

      service.deleteGroup(group._id);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
});