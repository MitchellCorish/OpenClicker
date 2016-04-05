//put all collections to be published here

//additional current user info to be published automatically to all users
Meteor.publish(null, function () {
  if(!this.userId)
  {
    return null;
  }
  return Meteor.users.find({
    _id: this.userId
  }, {
    $fields: {
      groups: true
    }
  });
});

Meteor.publish('userRoles', function () {
  if (!this.userId)
  {
    return null;
  }
  else if (Roles.userIsInRole(this.userId, ADMIN_ROLE, Roles.GLOBAL_GROUP))
  {
    return Users.find({}, {
      $fields: {
        emails: true,
        roles: true
      }
    });
  }
  else
  {
    return null;
  }
});

Meteor.publish('groups', function () {
  if(!this.userId)
  {
    return null;
  }
  return Groups.find({});
});

Meteor.publish('ownedQuestions', function () {
  if(!this.userId)
  {
    return null;
  }
  return Questions.find({
    userId: this.userId
  });
});

Meteor.publish('activeQuestions', function () {
  if(!this.userId)
  {
    return null;
  }
  return Questions.find({
    groupId: {
      $in: Meteor.users.findOne({_id: this.userId}).groups
    },
    active: true
  }, {
    fields: {
      answer: false,
      userId: false,
      groupId: false
    }
  });
});
  
 Meteor.publish('usersInGroup', function (groupId) {
   if(!this.userId)
  {
    return null;
  }
  else if (Roles.userIsInRole(this.userId, PROFESSOR_ROLE, Roles.GLOBAL_GROUP)){
    return Users.find({"groups": {$in:  [groupId]}}, {
        $fields: {
            username: true,
            roles: true,
            studentId: true,
            emails: true
      }});
  }
  else{
      return null;
  }
});

Meteor.publish('answersForQuestion', function (questionId) {
  if(!this.userId)
  {
    return null;
  }
  
  var question = Questions.findOne({ _id: questionId })
  
  if (question.userId == this.userId)
  {
    return Answers.find({
      questionId: questionId
    });
  }
  else
  {
    return null;
  }
});