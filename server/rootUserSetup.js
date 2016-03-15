// Root user creation
// IMPORTANT:  Keep in mind this only affects application behaviour and is
// therefore only as secure as the database.  If changes are made to the
// database directly, this will not work as intended.

RootUserSetup = function () {
  // create parameters for the root user
  var rootUserOptions = {
    username: 'root',
    email: 'root@openclicker.com',
    password: 'password'
  };

  var rootUserRoles = {
    [Roles.GLOBAL_GROUP]: [
      STUDENT_ROLE,
      PROFESSOR_ROLE,
      ADMIN_ROLE
    ]
  }

  // find the root user or create it if it does not exist
  var rootUser = Accounts.findUserByUsername(rootUserOptions.username);

  if(!rootUser)
  {
    console.log('creating root user...');
    
    var rootUserId = Accounts.createUser(rootUserOptions);
    
    // Add groups and roles fields since this code needs to run only on the server
    // which means it is loaded before the schema is defined
    // Additionally, set email to be verified automatically
    Meteor.users.update({ _id: rootUserId }, {
      $set: {
        'emails.0.verified': true,
        roles: rootUserRoles,
        groups: []
      }
    });
    
    rootUser = Accounts.findUserByUsername(rootUserOptions.username);
    
    console.log('root user created.');
    console.log('email:  ' + rootUserOptions.email + ' password:  ' + rootUserOptions.password);
    console.log('please log in and change your password immediately.');
  }

  // prevent the client from using the root username
  Accounts.validateNewUser(function (user) {
    return user.username !== rootUser.username;
  });

  // prevent name and permissions of root user from being changed
  // prevent root user from being deleted
  Meteor.users.find({ _id: rootUser._id }).observe({
    changed: function (newUser, oldUser) {
      if (newUser.userName != rootUserOptions.username)
      {
        Meteor.users.update({ _id: newUser._id }, {
          $set: {
            username: rootUserOptions.username
          }
        });
      }
      if (newUser.roles != rootUserRoles)
      {
        Meteor.users.update({ _id: newUser._id }, {
          $set: {
            roles: rootUserRoles
          }
        });
      }
    },
    removed: function (oldUser) {
      Meteor.users.insert(oldUser);
    }
  });
}