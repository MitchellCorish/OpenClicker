'use strict';

describe('RootUserSetup()', function () {
  var user;
  var userOptions;
  var testUserOptions;
  var userRoles;
  
  // set up
  beforeEach(function () {
    
    // mock data
    user = {
      _id: 'testId',
      createdAt: Date('2016-01-01T00:00:00'),
      username: 'root',
      emails: [{
        address: 'root@openclicker.com',
        verified: true
      }],
      roles: {
        [Roles.GLOBAL_GROUP]: [
          STUDENT_ROLE,
          PROFESSOR_ROLE,
          ADMIN_ROLE
        ]
      },
      groups: []
    }
    
    userOptions = {
      username: 'root',
      email: 'root@openclicker.com',
      password: 'password'
    }
    
    testUserOptions = {
      username: 'root',
      email: 'test@example.com',
      password: 'password'
    }
    
    userRoles = {
      [Roles.GLOBAL_GROUP]: [
        STUDENT_ROLE,
        PROFESSOR_ROLE,
        ADMIN_ROLE
      ]
    }
    
    // spies that won't change between tests
  });
  
  // test cases  
  it('should look for the root user', function () {
    spyOn(Accounts, 'findUserByUsername').and.returnValue(user);
    
    RootUserSetup();
    
    expect(Accounts.findUserByUsername).toHaveBeenCalledWith(user.username);
  });
  
  it('should create the root user if it does not exist', function () {
    spyOn(Accounts, 'findUserByUsername').and.returnValues(null, user);
    spyOn(Accounts, 'createUser').and.returnValue(user._id);
    
    RootUserSetup();
    
    expect(Accounts.createUser).toHaveBeenCalledWith(userOptions);
  });
  
  it('should set the root user\'s email to be verified, and set their roles and groups', function () {
    spyOn(Accounts, 'findUserByUsername').and.returnValues(null, user);
    spyOn(Accounts, 'createUser').and.returnValue(user._id);
    spyOn(Users, 'update');
    
    RootUserSetup();
    
    expect(Users.update).toHaveBeenCalledWith({ _id: user._id }, {
      $set: {
        'emails.0.verified': true,
        roles: userRoles,
        groups: []
      }
    });
  });
  
  it('should prevent other users from using the root username', function () {
    spyOn(Accounts, 'validateNewUser');
    spyOn(Meteor, 'Error');
    
    RootUserSetup();
    
    expect(Accounts.validateNewUser).toHaveBeenCalled();
    
    try
    {
      Accounts.createUser(testUserOptions);
    }
    catch(e) {}
    
    expect(Meteor.Error).toHaveBeenCalled();
  });
});