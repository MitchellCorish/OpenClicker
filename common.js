//Collection creation
Users = Meteor.users;
Questions = new Mongo.Collection("questions");
Groups = new Mongo.Collection("groups");
Answers = new Mongo.Collection("answers");

// *****Collection Schemas*****
var Schema ={};

//User Country Schema
Schema.UserCountry = new SimpleSchema({
    name: {
        type: String
    },
    code: {
        type: String,
        regEx: /^[A-Z]{2}$/
    }
});

//User Profile Schema
Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true
    },
    lastName: {
        type: String,
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization : {
        type: String,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    },
    country: {
        type: Schema.UserCountry,
        optional: true
    }
});

//Users Schema
Schema.Users = new SimpleSchema({
  username: {
        type: String,
        optional: true
    },
    emails: {
        type: Array,
        optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    // Make sure this services field is in your schema if you're using any of the accounts packages
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        blackbox: true,
        defaultValue: {
          [Roles.GLOBAL_GROUP]: [
            STUDENT_ROLE
          ]
        }
    },
    // In order to avoid an 'Exception in setInterval callback' from Meteor
    heartbeat: {
        type: Date,
        optional: true
    },
    groups: {
        type: [String],
        label: "Groups for this user",
        defaultValue: []
    }
});

//Questions Schema
Schema.Questions = new SimpleSchema({
  userId: {
    type: String,
    label: "User ID"
  },
  groupId: {
    type: String,
    label: "Group ID"
  },
  questionAsked: {
    type: String,
    label: "Question"
  },
  possibleAnswers: {
    type: [String],
    label: "Possible Answers",
    minCount: 2
  },
  answer: {
    type: Number,
    label: "Correct Answer",
    min: 0
  },
  active: {
    type: Boolean
  }
});

//Group Schema
Schema.Groups = new SimpleSchema({
  userId: {
    type: String,
    label: "User Admin ID"
  },
  name: {
    type: String,
    label: "Group Name"
  }
});

//Answers Schema
Schema.Answers = new SimpleSchema({
  questionId: {
    type: String,
    label: "Question ID"
  },
  groupId: {
    type: String,
    label: "Group ID"
  },
  userId: {
    type: String,
    label: "User ID"
  },
  answer: {
    type: Number,
    label: "Answer"
  }
});

//Attaching collections to schemas created
Users.attachSchema(Schema.Users, {replace: true});
Questions.attachSchema(Schema.Questions, {replace: true});
Groups.attachSchema(Schema.Groups, {replace: true});
Answers.attachSchema(Schema.Answers, {replace: true});

Meteor.methods({
  answerQuestion: function (questionId, selectedAnswer) {
    MethodHelpers.checkUserLoggedIn();
    MethodHelpers.checkVerifiedUser();
    MethodHelpers.checkQuestionExists(questionId);
    MethodHelpers.checkQuestionIsActive(questionId);
    
    var question = Questions.findOne({
      _id: questionId
    });
    
    MethodHelpers.checkUserInGroup(question.groupId);
    MethodHelpers.checkAnswerInRange(questionId, selectedAnswer);
    
    Answers.update({
      questionId: question._id,
      groupId: question.groupId,
      userId: Meteor.userId()
    }, {
      $set: {
        answer: selectedAnswer
      }
    }, {
      upsert: true
    });
    
    return true;
  },
  createGroup: function (groupName) {
    MethodHelpers.checkUserLoggedIn();
    MethodHelpers.checkVerifiedUser();
    MethodHelpers.checkCreatorPermissions();
    
    Groups.insert({
      userId: Meteor.userId(),
      name: groupName
    });
    
    return true;
  },
  deleteGroup: function (groupId) {
    MethodHelpers.checkUserLoggedIn();
    MethodHelpers.checkVerifiedUser();
    MethodHelpers.checkCreatorPermissions();
    MethodHelpers.checkGroupExists(groupId);
    MethodHelpers.checkGroupOwnership(groupId);
    
    Groups.remove({
      _id: groupId,
      userId: Meteor.userId()
    });
    
    //remove all users, questions, and answers from deleted group
    Users.update({}, {
      $pull: {
        groups: groupId
      }
    }, {
      multi: true
    });
    
    Questions.remove({
      groupId: groupId
    });
    
    Answers.remove({
      groupId: groupId
    });
    
    return true;
  },
  joinGroup: function (groupId) {
    MethodHelpers.checkUserLoggedIn();
    MethodHelpers.checkVerifiedUser();
    MethodHelpers.checkGroupExists(groupId);
    MethodHelpers.checkUserNotInGroup(groupId);
    
    Users.update({
      _id: Meteor.userId()
    }, {
      $push: {
        groups: groupId
      }
    });
    
    return true;
  },
  leaveGroup: function (groupId) {
    MethodHelpers.checkUserLoggedIn();
    MethodHelpers.checkVerifiedUser();
    MethodHelpers.checkGroupExists(groupId);
    MethodHelpers.checkUserInGroup(groupId);
    
    Users.update({
      _id: Meteor.userId()
    }, {
      $pull: {
        groups: groupId
      }
    });
    
    return true;
  },
  updateGroup: function (group) {
    MethodHelpers.checkUserLoggedIn();
    MethodHelpers.checkVerifiedUser();
    MethodHelpers.checkCreatorPermissions();
    MethodHelpers.checkGroupExists(group._id);
    MethodHelpers.checkGroupOwnership(group._id);
    
    Groups.update({
      _id: group._id,
      userId: Meteor.userId()
    }, {
      $set: {
        name: group.name
      }
    });
    
    return true;
  }
});

// define some functions for things we will have to check frequently
MethodHelpers = {
  checkAdminPermissions: function () {
    if (!Roles.userIsInRole(Meteor.userId(), ADMIN_ROLE, Roles.GLOBAL_GROUP))
    {
      throw new Meteor.Error(ERROR_NOT_AUTHORIZED);
    }
  },
  checkAnswerInRange: function (questionId, selectedAnswer) {
    var question = Questions.findOne({ _id: questionId });
    
    if (selectedAnswer < 0 || selectedAnswer >= question.possibleAnswers.length)
    {
      throw new Meteor.Error(ERROR_ANSWER_OUT_OF_RANGE);
    }
  },
  checkCreatorPermissions: function () {
    if (!Roles.userIsInRole(Meteor.userId(), PROFESSOR_ROLE, Roles.GLOBAL_GROUP))
    {
      throw new Meteor.Error(ERROR_NOT_AUTHORIZED);
    }
  },
  checkGroupExists: function (groupId) {
    if (!Groups.findOne({ _id: groupId }))
    {
      throw new Meteor.Error(ERROR_GROUP_DOES_NOT_EXIST);
    }
  },
  checkGroupOwnership: function (groupId) {
    var group = Groups.findOne({ _id: groupId });

    if (!(group.userId == Meteor.userId()))
    {
      throw new Meteor.Error(ERROR_NOT_AUTHORIZED);
    }
  },
  checkQuestionExists: function (questionId) {
    if (!Questions.findOne({ _id: questionId }))
    {
      throw new Meteor.Error(ERROR_QUESTION_DOES_NOT_EXIST);
    }
  },
  checkQuestionIsActive: function (questionId) {
    var question = Questions.findOne({ _id: questionId });
    
    if (!question.active)
    {
      throw new Meteor.Error(ERROR_QUESTION_INACTIVE);
    }
  },
  checkUserInGroup: function (groupId) {
    if (!(Meteor.user().groups) || !(Meteor.user().groups && Meteor.user().groups.indexOf(groupId) >= 0))
    {
      throw new Meteor.Error(ERROR_NOT_IN_GROUP);
    }
  },
  checkUserLoggedIn: function () {
    if (!Meteor.userId())
    {
      throw new Meteor.Error(ERROR_NOT_AUTHORIZED);
    }
  },
  checkUserNotInGroup: function (groupId) {
    if (Meteor.user().groups && Meteor.user().groups.indexOf(groupId) >= 0)
    {
      throw new Meteor.Error(ERROR_ALREADY_IN_GROUP);
    }
  },
  checkVerifiedUser: function () {
    if (!Meteor.user().emails[0].verified)
    {
      throw new Meteor.Error(ERROR_NOT_AUTHORIZED);
    }
  }
}