'use strict';

describe('RolesService', function () {
  beforeEach(module('openClicker'));
  
  var service;
  var userId;
  var errorMessage;
  
  // inject dependencies
  beforeEach(inject(function (RolesService) {
    service = RolesService;
  }));
  
  // set up
  beforeEach(function () {
    
    userId = 'testUser';
    errorMessage = 'error message';
    
    // spies that won't change between tests
    spyOn(console, 'log');
  });
  
  // test cases  
  describe('updateRoles()', function () {
    it('should call the updateRoles Meteor method', function () {
      var updateRoles = VelocityHelpers.spyOnMethod('updateRoles');
      
      service.updateRoles(userId, true, true, true);
      
      expect(updateRoles).toHaveBeenCalledWith(userId, true, true, true);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('updateRoles', { message: errorMessage }, null);

      service.updateRoles(userId, true, true, true);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
});