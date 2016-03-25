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