'use strict';

describe('Meteor.methods', function () {
  var question;
  var user;
  var group;
  var answer;
  var timestamp;
  
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
        [Roles.GLOBAL_GROUP]: []
      },
      groups: [
        'testGroup'
      ],
      profile: {
        institution: 'UPEI',
        faculty: 'Science',
        studentId: '123456'
      }
    }
    
    question = {
      _id: 'testQuestion',
      groupId: 'testGroup',
      questionAsked: 'what is 2 + 2?',
      possibleAnswers: ['11', '4', '5'],
      answer: 1,
      userId: 'testUser',
      active: false,
      startTime: Math.floor(Date.now() / 1000),
      endTime: (Math.floor(Date.now() / 1000)+ 30),
    };
    
    group = {
      _id: 'testGroup',
      userId: 'testUser',
      name: 'test group'
    };
    
    answer = 0;
    timestamp = (Math.floor(Date.now() / 1000) + 10);
    
    // spies that won't change between tests
    spyOn(MethodHelpers, 'checkAdminPermissions').and.returnValue(true);
    spyOn(MethodHelpers, 'checkAnswerInRange').and.returnValue(true);
    spyOn(MethodHelpers, 'checkAnswerInTime').and.returnValue(true);
    spyOn(MethodHelpers, 'checkCreatorPermissions').and.returnValue(true);
    spyOn(MethodHelpers, 'checkGroupExists').and.returnValue(true);
    spyOn(MethodHelpers, 'checkGroupOwnership').and.returnValue(true);
    spyOn(MethodHelpers, 'checkQuestionExists').and.returnValue(true);
    spyOn(MethodHelpers, 'checkQuestionIsActive').and.returnValue(true);
    spyOn(MethodHelpers, 'checkQuestionOwnership').and.returnValue(true);
    spyOn(MethodHelpers, 'checkUserExists').and.returnValue(true);
    spyOn(MethodHelpers, 'checkUserInGroup').and.returnValue(true);
    spyOn(MethodHelpers, 'checkUserLoggedIn').and.returnValue(true);
    spyOn(MethodHelpers, 'checkUserNotInGroup').and.returnValue(true);
    spyOn(MethodHelpers, 'checkStudentInGroup').and.returnValue(true);
    spyOn(MethodHelpers, 'checkVerifiedUser').and.returnValue(true);
    spyOn(Meteor, 'userId').and.returnValue(user._id);
    spyOn(Questions, 'findOne').and.returnValue(question);
  });
  
  // test cases  
  describe('answerQuestion()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('answerQuestion', question._id, answer, timestamp);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('answerQuestion', question._id, answer, timestamp);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the question exists', function () {
      Meteor.call('answerQuestion', question._id, answer, timestamp);
      
      expect(MethodHelpers.checkQuestionExists).toHaveBeenCalledWith(question._id);
    });
    
    it('should check that the question is active', function () {
      Meteor.call('answerQuestion', question._id, answer, timestamp);
      
      expect(MethodHelpers.checkQuestionIsActive).toHaveBeenCalledWith(question._id);
    });
    
    it('should check that the user is in the group for the question', function () {
      Meteor.call('answerQuestion', question._id, answer, timestamp);
      
      expect(MethodHelpers.checkUserInGroup).toHaveBeenCalledWith(question.groupId);
    });
    
    it('should check that the provided answer is in the range of answers for the question', function () {
      Meteor.call('answerQuestion', question._id, answer, timestamp);
      
      expect(MethodHelpers.checkAnswerInRange).toHaveBeenCalledWith(question._id, answer);
    });
    
    it('should check that the provided answer within the allowed time frame', function () {
      Meteor.call('answerQuestion', question._id, answer, timestamp);
      
      expect(MethodHelpers.checkAnswerInTime).toHaveBeenCalledWith(question._id, timestamp);
    });
    
    it('should insert or update an answer to the specified question', function () {
      spyOn(Answers, 'update').and.returnValue(true);
      
      Meteor.call('answerQuestion', question._id, answer, timestamp);
      
      expect(Answers.update).toHaveBeenCalledWith({
        questionId: question._id,
        groupId: question.groupId,
        userId: user._id
      }, {
        $set: {
          answer: answer,
          timestamp: timestamp,
          correct: answer == question.answer
        }
      }, {
        upsert: true
      });
    });
  });
  
  describe('createGroup()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('createGroup', group.name);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('createGroup', group.name);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the user has creator permissions', function () {
      Meteor.call('createGroup', group.name);
      
      expect(MethodHelpers.checkCreatorPermissions).toHaveBeenCalled();
    });
    
    it('should create a new group with the given name owned by the current user', function () {
      spyOn(Groups, 'insert').and.returnValue(true);
      
      Meteor.call('createGroup', group.name);
      
      expect(Groups.insert).toHaveBeenCalledWith({
        userId: user._id,
        name: group.name
      });
    });
  });
  
  describe('createQuestion()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('createQuestion', group._id, question.questionAsked, question.possibleAnswers, question.answer);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('createQuestion', group._id, question.questionAsked, question.possibleAnswers, question.answer);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the user has creator permissions', function () {
      Meteor.call('createQuestion', group._id, question.questionAsked, question.possibleAnswers, question.answer);
      
      expect(MethodHelpers.checkCreatorPermissions).toHaveBeenCalled();
    });
    
    it('should check that the user owns the group they are trying to add a question to', function () {
      Meteor.call('createQuestion', group._id, question.questionAsked, question.possibleAnswers, question.answer);
      
      expect(MethodHelpers.checkGroupOwnership).toHaveBeenCalledWith(group._id);
    });
    
    it('should create a new question with the given name and possible answers owned by the current user', function () {
      spyOn(Questions, 'insert').and.returnValue(true);
      
      Meteor.call('createQuestion', group._id, question.questionAsked, question.possibleAnswers, question.answer);
      
      expect(Questions.insert).toHaveBeenCalledWith({
        userId: user._id,
        groupId: group._id,
        questionAsked: question.questionAsked,
        possibleAnswers: question.possibleAnswers,
        answer: question.answer,
        active: false,
      });
    });
  });
  
  describe('deleteGroup()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('deleteGroup', group._id);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('deleteGroup', group._id);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the user has creator permissions', function () {
      Meteor.call('deleteGroup', group._id);
      
      expect(MethodHelpers.checkCreatorPermissions).toHaveBeenCalled();
    });
    
    it('should check that the group exists', function () {
      Meteor.call('deleteGroup', group._id);
      
      expect(MethodHelpers.checkGroupExists).toHaveBeenCalledWith(group._id);
    });
    
    it('should check that the current user owns the specified group', function () {
      Meteor.call('deleteGroup', group._id);
      
      expect(MethodHelpers.checkGroupOwnership).toHaveBeenCalledWith(group._id);
    });
    
    it('should delete the specified group', function () {
      spyOn(Groups, 'remove').and.returnValue(true);
      
      Meteor.call('deleteGroup', group._id);
      
      expect(Groups.remove).toHaveBeenCalledWith({
        _id: group._id,
        userId: user._id
      });
    });
    
    it('should delete any questions and answers that belong to the specified group', function () {
      spyOn(Questions, 'remove').and.returnValue(true);
      spyOn(Answers, 'remove').and.returnValue(true);
      
      Meteor.call('deleteGroup', group._id);
      
      expect(Questions.remove).toHaveBeenCalledWith({
        groupId: group._id
      });
      expect(Answers.remove).toHaveBeenCalledWith({
        groupId: group._id
      });
    });
    
    it('should remove all users from the specified group', function () {
      spyOn(Users, 'update').and.returnValue(true);
      
      Meteor.call('deleteGroup', group._id);
      
      expect(Users.update).toHaveBeenCalledWith({}, {
        $pull: {
          groups: group._id
        }
      }, {
        multi: true
      });
    });
  });
  
  describe('deleteQuestion()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('deleteQuestion', question._id);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('deleteQuestion', question._id);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the user has creator permissions', function () {
      Meteor.call('deleteQuestion', question._id);
      
      expect(MethodHelpers.checkCreatorPermissions).toHaveBeenCalled();
    });
    
    it('should check that the question exists', function () {
      Meteor.call('deleteQuestion', question._id);
      
      expect(MethodHelpers.checkQuestionExists).toHaveBeenCalledWith(question._id);
    });
    
    it('should check that the current user owns the specified question', function () {
      Meteor.call('deleteQuestion', question._id);
      
      expect(MethodHelpers.checkQuestionOwnership).toHaveBeenCalledWith(question._id);
    });
    
    it('should delete the specified question', function () {
      spyOn(Questions, 'remove').and.returnValue(true);
      
      Meteor.call('deleteQuestion', question._id);
      
      expect(Questions.remove).toHaveBeenCalledWith({
        _id: question._id,
        userId: user._id
      });
    });
  });
  
  describe('joinGroup()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('joinGroup', group._id);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('joinGroup', group._id);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the group exists', function () {
      Meteor.call('joinGroup', group._id);
      
      expect(MethodHelpers.checkGroupExists).toHaveBeenCalledWith(group._id);
    });
    
    it('should check that the user is not already in the group', function () {
      Meteor.call('joinGroup', group._id);
      
      expect(MethodHelpers.checkUserNotInGroup).toHaveBeenCalledWith(group._id);
    });
    
    it('should add the specified group to the current user\'s joined groups', function () {
      spyOn(Users, 'update').and.returnValue(true);
      
      Meteor.call('joinGroup', group._id);
      
      expect(Users.update).toHaveBeenCalledWith({
        _id: user._id
      }, {
        $push: {
          groups: group._id
        }
      });
    });
  });
  
  describe('leaveGroup()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('leaveGroup', group._id);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('leaveGroup', group._id);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the group exists', function () {
      Meteor.call('leaveGroup', group._id);
      
      expect(MethodHelpers.checkGroupExists).toHaveBeenCalledWith(group._id);
    });
    
    it('should check that the user is in the group', function () {
      Meteor.call('leaveGroup', group._id);
      
      expect(MethodHelpers.checkUserInGroup).toHaveBeenCalledWith(group._id);
    });
    
    it('should remove the specified group from the current user\'s joined groups', function () {
      spyOn(Users, 'update').and.returnValue(true);
      
      Meteor.call('leaveGroup', group._id);
      
      expect(Users.update).toHaveBeenCalledWith({
        _id: user._id
      }, {
        $pull: {
          groups: group._id
        }
      });
    });
  });
  
  describe('deleteUserFromGroup()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('deleteUserFromGroup', user._id, group._id);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('deleteUserFromGroup', user._id, group._id);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the group exists', function () {
      Meteor.call('deleteUserFromGroup', user._id, group._id);
      
      expect(MethodHelpers.checkGroupExists).toHaveBeenCalledWith(group._id);
    });
    
    it('should check that the student is in the group', function () {
      Meteor.call('deleteUserFromGroup', user._id, group._id);
      
      expect(MethodHelpers.checkStudentInGroup).toHaveBeenCalledWith(user._id, group._id);
    });
    
    it('should check that the current user owns the specified group', function () {
      Meteor.call('deleteUserFromGroup', user._id, group._id);
      
      expect(MethodHelpers.checkGroupOwnership).toHaveBeenCalledWith(group._id);
    });
    
    it('should remove the specified group from the current user\'s joined groups', function () {
      spyOn(Users, 'update').and.returnValue(true);
      
      Meteor.call('deleteUserFromGroup', user._id, group._id);
      
      expect(Users.update).toHaveBeenCalledWith({
        _id: user._id
      }, {
        $pull: {
          groups: group._id
        }
      });
    });
  });
  
  
  
  describe('updateGroup()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('updateGroup', group);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('updateGroup', group);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the user has creator permissions', function () {
      Meteor.call('updateGroup', group);
      
      expect(MethodHelpers.checkCreatorPermissions).toHaveBeenCalled();
    });
    
    it('should check that the group exists', function () {
      Meteor.call('updateGroup', group);
      
      expect(MethodHelpers.checkGroupExists).toHaveBeenCalledWith(group._id);
    });
    
    it('should check that the current user owns the specified group', function () {
      Meteor.call('updateGroup', group);
      
      expect(MethodHelpers.checkGroupOwnership).toHaveBeenCalledWith(group._id);
    });
    
    it('should update the name of the specified group', function () {
      spyOn(Groups, 'update').and.returnValue(true);
      
      Meteor.call('updateGroup', group);
      
      expect(Groups.update).toHaveBeenCalledWith({
        _id: group._id,
        userId: user._id
      }, {
        $set: {
          name: group.name
        }
      });
    });
  });
  
  describe('updateQuestionStartTime()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('updateQuestionStartTime', question._id, question.startTime);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('updateQuestionStartTime', question._id, question.startTime);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the user has creator permissions', function () {
      Meteor.call('updateQuestionStartTime', question._id, question.startTime);
      
      expect(MethodHelpers.checkCreatorPermissions).toHaveBeenCalled();
    });
    
    it('should check that the question exists', function () {
      Meteor.call('updateQuestionStartTime', question._id, question.startTime);
      
      expect(MethodHelpers.checkQuestionExists).toHaveBeenCalledWith(question._id);
    });
    
    it('should check that the current user owns the specified question', function () {
      Meteor.call('updateQuestionStartTime', question._id, question.startTime);
      
      expect(MethodHelpers.checkQuestionOwnership).toHaveBeenCalledWith(question._id);
     });
     
    it('should update the startTime of the specified question', function () {
      spyOn(Questions, 'update').and.returnValue(true);
      
      Meteor.call('updateQuestionStartTime', question._id, question.startTime);
      
      expect(Questions.update).toHaveBeenCalledWith({
        _id: question._id,
        userId: user._id
      }, {
        $set: {
          startTime: question.startTime
        }
      });
    });
  });
  
  describe('updateQuestionEndTime()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('updateQuestionEndTime', question._id, question.endTime);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('updateQuestionEndTime', question._id, question.endTime);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the user has creator permissions', function () {
      Meteor.call('updateQuestionEndTime', question._id, question.endTime);
      
      expect(MethodHelpers.checkCreatorPermissions).toHaveBeenCalled();
    });
    
    it('should check that the question exists', function () {
      Meteor.call('updateQuestionEndTime', question._id, question.endTime);
      
      expect(MethodHelpers.checkQuestionExists).toHaveBeenCalledWith(question._id);
    });
    
    it('should check that the current user owns the specified question', function () {
      Meteor.call('updateQuestionEndTime', question._id, question.endTime);
      
      expect(MethodHelpers.checkQuestionOwnership).toHaveBeenCalledWith(question._id);
    });
    
    it('should update the endTime of the specified question', function () {
      spyOn(Questions, 'update').and.returnValue(true);
      
      Meteor.call('updateQuestionEndTime', question._id, question.endTime);
      
      expect(Questions.update).toHaveBeenCalledWith({
        _id: question._id,
        userId: user._id
      }, {
        $set: {
         endTime: question.endTime
        }
      });
    });
  });
  
  describe('updateRoles()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('updateRoles', user._id, true, true, true);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('updateRoles', user._id, true, true, true);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should check that the user has administrator permissions', function () {
      Meteor.call('updateRoles', user._id, true, true, true);
      
      expect(MethodHelpers.checkAdminPermissions).toHaveBeenCalled();
    });
    
    it('should check that the user exists', function () {
      Meteor.call('updateRoles', user._id, true, true, true);
      
      expect(MethodHelpers.checkUserExists).toHaveBeenCalledWith(user._id);
    });
    
    it('should update the roles of the specified user to those given', function () {
      spyOn(Roles, 'setUserRoles');
      
      Meteor.call('updateRoles', user._id, true, true, true);
      
      expect(Roles.setUserRoles).toHaveBeenCalledWith(user._id, [STUDENT_ROLE, PROFESSOR_ROLE, ADMIN_ROLE], Roles.GLOBAL_GROUP);
    });
  });
  
  describe('updateUser()', function () {
    it('should check that the user is logged in', function () {
      Meteor.call('updateUser', user);
      
      expect(MethodHelpers.checkUserLoggedIn).toHaveBeenCalled();
    });
    
    it('should check that the user\'s email is verified', function () {
      Meteor.call('updateUser', user);
      
      expect(MethodHelpers.checkVerifiedUser).toHaveBeenCalled();
    });
    
    it('should update the name of the specified user', function () {
      spyOn(Users, 'update').and.returnValue(true);
      
      Meteor.call('updateUser', user);
      
      expect(Users.update).toHaveBeenCalledWith({
        _id: user._id,
      }, {
        $set: {
          username: user.username,
          "profile.institution": user.profile.institution,
          "profile.faculty": user.profile.faculty,
          "profile.studentId": user.profile.studentId,
        }
      });
    });
  });
});