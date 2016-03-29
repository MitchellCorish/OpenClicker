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

Meteor.publish('users', function () {
  if(!this.userId)
  {
    return null;
  }
  return Users.find({
    groupId: this.groupId
  });
});

Meteor.publish('ownedQuizes', function () {
  if(!this.userId)
  {
    return null;
  }
  return Quizes.find({
    userId: this.userId
  });
});

Meteor.publish('questions', function (quizId) {
  check(quizId, String);
  return
    Questions.find({
      quizId: quizId});

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