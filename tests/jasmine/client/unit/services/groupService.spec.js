'use strict';

describe('GroupService', function () {
  beforeEach(module('openClicker'));
  
  var service;
  var errorMessage = 'error message';
  
  // inject dependencies
  beforeEach(inject(function (GroupService) {
    service = GroupService;
  }));
  
  // set up
  beforeEach(function () {
    
    // spies that won't change between tests
    spyOn(console, 'log');
    spyOn(window, 'alert');
  });
  
  // test cases  
  describe('createGroup()', function () {
    it('should call the createGroup Meteor method', function () {
      var createGroup = VelocityHelpers.spyOnMethod('createGroup');
      
      service.createGroup('testGroup');
      
      expect(createGroup).toHaveBeenCalled();
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('createGroup', { message: errorMessage }, null);

      service.createGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('updateGroup()', function () {
    it('should call the updateGroup Meteor method', function () {
      var updateGroup = VelocityHelpers.spyOnMethod('updateGroup');
      
      service.updateGroup('testGroup');
      
      expect(updateGroup).toHaveBeenCalled();
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('updateGroup', { message: errorMessage }, null);

      service.updateGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('deleteGroup()', function () {
    it('should call the deleteGroup Meteor method', function () {
      var deleteGroup = VelocityHelpers.spyOnMethod('deleteGroup');
      
      service.deleteGroup('testGroup');
      
      expect(deleteGroup).toHaveBeenCalled();
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('deleteGroup', { message: errorMessage }, null);

      service.deleteGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
});