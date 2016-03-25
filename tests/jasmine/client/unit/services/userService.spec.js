'use strict';

describe('UserService', function () {
  beforeEach(module('openClicker'));
  
  var service;
  var errorMessage;
  var user;
  var success;
  var failure;
  
  // inject dependencies
  beforeEach(inject(function (UserService) {
    service = UserService;
  }));
  
  // set up
  beforeEach(function () {
    
    user = {
      _id: 'testUser',
      username: 'testUser',
      "profile.institution": 'testInstitution',
      "profile.faculty": 'testFaculty',
      "profile.studentId": '666666',
    };
    
    errorMessage = 'error message';
    
    // spies that won't change between tests
    spyOn(console, 'log');
    spyOn(window, 'alert');
    success = jasmine.createSpy('success');
    failure = jasmine.createSpy('failure');
  });
  
  describe('updateUser()', function () {
    it('should call the updateUser Meteor method', function () {
      var updateUser = VelocityHelpers.spyOnMethod('updateUser');
      
      service.updateUser(user);
      
      expect(updateUser).toHaveBeenCalledWith(user);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('updateUser', { message: errorMessage }, null);

      service.updateUser(user);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
    
    it('should call the success callback when the updateUserp Meteor method is successful', function () {
      VelocityHelpers.stubMethod('updateUser', null, true);
      
      service.updateUser(user, success, failure);
      
      expect(success).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the updateUser Meteor method is not successful', function () {
      VelocityHelpers.stubMethod('updateUser', null, false);
      
      service.updateUser(user, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the updateUser Meteor method throws an error', function () {
      VelocityHelpers.stubMethod('updateUser', { message: errorMessage }, null);
      
      service.updateUser(user, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
  });
  
});