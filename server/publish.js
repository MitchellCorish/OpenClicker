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