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
      spyOn(Meteor, 'call');
      
      service.createGroup('testGroup');
      
      expect(Meteor.call).toHaveBeenCalledWith('createGroup', 'testGroup', jasmine.any(Function));
    });
    
    it('should print errors to the console', function () {      
      spyOn(Meteor, 'call').and.callFake(function (method, groupName, callback) {
        callback({
          message: errorMessage
        }, null);
      });

      service.createGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('updateGroup()', function () {
    it('should call the updateGroup Meteor method', function () {
      spyOn(Meteor, 'call');
      
      service.updateGroup('testGroup');
      
      expect(Meteor.call).toHaveBeenCalledWith('updateGroup', 'testGroup', jasmine.any(Function));
    });
    
    it('should print errors to the console', function () {      
      spyOn(Meteor, 'call').and.callFake(function (method, groupName, callback) {
        callback({
          message: errorMessage
        }, null);
      });

      service.updateGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('deleteGroup()', function () {
    it('should call the deleteGroup Meteor method', function () {
      spyOn(Meteor, 'call');
      
      service.deleteGroup('testGroup');
      
      expect(Meteor.call).toHaveBeenCalledWith('deleteGroup', 'testGroup', jasmine.any(Function));
    });
    
    it('should print errors to the console', function () {      
      spyOn(Meteor, 'call').and.callFake(function (method, groupName, callback) {
        callback({
          message: errorMessage
        }, null);
      });

      service.deleteGroup('testGroup');

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
});