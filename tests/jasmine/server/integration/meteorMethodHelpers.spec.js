'use strict';

describe('MethodHelpers', function () {
  var user;
  
  // set up
  beforeEach(function () {
    
    // mock data
    user = {
      _id: 'testUser',
      createdAt: Date('2016-01-01T00:00:00'),
      emails: [{
        address: 'testUser@example.com',
        verified: false
      }],
      roles: {
        __global_roles__: []
      },
      groups: [
        'testGroup'
      ]
    }
    
    // spies that won't change between tests
    spyOn(Meteor, 'Error');
    spyOn(Meteor, 'user').and.returnValue(user);
    spyOn(Roles, 'userIsInRole').and.returnValue(false);
  });
  
  // test cases  
  describe('checkAdminPermissions()', function () {
    it('should throw a \'' + ERROR_NOT_AUTHORIZED + '\' error if the current user does not have the \'' + ADMIN_ROLE + '\' role', function () {
      spyOn(Meteor, 'userId').and.returnValue('unauthorizedTestUser');
      
      try
      {
        MethodHelpers.checkAdminPermissions();
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_NOT_AUTHORIZED);
    });
  });
  
  describe('checkCreatorPermissions()', function () {
    it('should throw a \'' + ERROR_NOT_AUTHORIZED + '\' error if the user does not have the \'' + PROFESSOR_ROLE + '\' role', function () {
      spyOn(Meteor, 'userId').and.returnValue('unauthorizedTestUser');
      
      try
      {
        MethodHelpers.checkCreatorPermissions();
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_NOT_AUTHORIZED);
    });
  });
  
  describe('checkGroupExists()', function () {
    it('should throw a \'' + ERROR_GROUP_DOES_NOT_EXIST + '\' error if a group with the given id does not exist', function () {
      try
      {
        MethodHelpers.checkGroupExists('nonExistentGroup');
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_GROUP_DOES_NOT_EXIST);
    });
  });
  
  describe('checkGroupOwnership()', function () {
    it('should throw a \'' + ERROR_NOT_AUTHORIZED + '\' error if the current user does not own the specified group', function () {
      spyOn(Meteor, 'userId').and.returnValue(user._id);
      spyOn(Groups, 'findOne').and.returnValue({
        _id: 'unownedTestGroup',
        userId: 'testUser2',
        name: 'test group'
      });
      
      try
      {
        MethodHelpers.checkGroupOwnership('unownedTestGroup');
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_NOT_AUTHORIZED);
    });
  });
  
  describe('checkUserInGroup()', function () {
    it('should throw a \'' + ERROR_NOT_IN_GROUP + '\' error if the current user does not belong to the specified group', function () {
      try
      {
        MethodHelpers.checkUserInGroup('testGroup2');
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_NOT_IN_GROUP);
    });
  });
  
  describe('checkUserLoggedIn()', function () {
    it('should throw a \'' + ERROR_NOT_AUTHORIZED + '\' error if the current user is not logged in', function () {
      spyOn(Meteor, 'userId').and.returnValue(null);
      
      try
      {
        MethodHelpers.checkUserLoggedIn();
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_NOT_AUTHORIZED);
    });
  });
  
  describe('checkUserNotInGroup()', function () {
    it('should throw a \'' + ERROR_ALREADY_IN_GROUP + '\' error if the user is in the specified group', function () {
      try
      {
        MethodHelpers.checkUserNotInGroup('testGroup');
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_ALREADY_IN_GROUP);
    });
  });
  
  describe('checkVerifiedUser()', function () {
    it('should throw a \'' + ERROR_NOT_AUTHORIZED + '\' error if the current user has not verified their email address', function () {
      try
      {
        MethodHelpers.checkVerifiedUser();
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_NOT_AUTHORIZED);
    });
  });
});