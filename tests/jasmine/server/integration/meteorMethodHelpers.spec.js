'use strict';

describe('MethodHelpers', function () {
  var user;
  var question;
  
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
      ]
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
      endTime: (Math.floor(Date.now() / 1000)+ 30)
    };
    
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
  
  describe('checkAnswerInTime', function () {
    it('should throw a \'' + ERROR_ANSWER_OUT_OF_TIME + '\' error if the answer was not provided during the time the question was active', function () {
      spyOn(Questions, 'findOne').and.returnValue(question);
      
      try
      {
        MethodHelpers.checkAnswerInTime(question._id, Math.floor(Date.now() / 1000)+ 60);
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_ANSWER_OUT_OF_TIME);
    });
  });
  
  describe('checkAnswerInRange()', function () {
    it('should throw a \'' + ERROR_ANSWER_OUT_OF_RANGE + '\' error if the specified answer is outside the range of possible answers', function () {
      spyOn(Questions, 'findOne').and.returnValue(question);
      
      try
      {
        MethodHelpers.checkAnswerInRange('testQuestion', -1);
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_ANSWER_OUT_OF_RANGE);
      
      try
      {
        MethodHelpers.checkAnswerInRange('testQuestion', question.possibleAnswers.length);
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_ANSWER_OUT_OF_RANGE);
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
  
  describe('checkQuestionExists()', function () {
    it('should throw a \'' + ERROR_QUESTION_DOES_NOT_EXIST + '\' error if a question with the given id does not exist', function () {
      try
      {
        MethodHelpers.checkQuestionExists('nonExistentQuestion');
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_QUESTION_DOES_NOT_EXIST);
    });
  });
  
  describe('checkQuizExists', function () {
    it('should throw a \'' + ERROR_QUIZ_DOES_NOT_EXIST + '\' error if a quiz with the given id does not exist', function () {
      try
      {
        MethodHelpers.checkQuizExists('nonExistentQuiz');
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_QUIZ_DOES_NOT_EXIST);
    });
  });
  
  describe('checkQuizOwnership()', function () {
    it('should throw a \'' + ERROR_NOT_AUTHORIZED + '\' error if the current user does not own the specified quiz', function () {
      spyOn(Meteor, 'userId').and.returnValue(user._id);
      spyOn(Quizzes, 'findOne').and.returnValue({
        _id: 'unownedTestQuiz',
        userId: 'testUser2',
        groupId: 'unownedTestQuiz',
        name: 'test quiz',
        questions: []
      });
      
      try
      {
        MethodHelpers.checkQuizOwnership('unownedTestQuiz');
      }
      catch(e) {}

      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_NOT_AUTHORIZED);
    });
  });
  
  describe('checkQuestionIsActive()', function () {
    it('should throw a \'' + ERROR_QUESTION_INACTIVE + '\' error if the specified question is not active', function () {
      spyOn(Questions, 'findOne').and.returnValue(question);
      
      try
      {
        MethodHelpers.checkQuestionIsActive('testQuestion');
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_QUESTION_INACTIVE);
    });
  });
  
  describe('checkQuestionOwnership()', function () {
    it('should throw a \'' + ERROR_NOT_AUTHORIZED + '\' error if the current user does not own the specified question', function () {
      spyOn(Meteor, 'userId').and.returnValue(user._id);
      spyOn(Questions, 'findOne').and.returnValue({
        _id: 'unownedTestQuestion',
        groupId: 'testGroup',
        questionAsked: 'what is 2 + 2?',
        possibleAnswers: ['11', '4', '5'],
        answer: 1,
        userId: 'testUser2',
        active: false
      });
      
      try
      {
        MethodHelpers.checkQuestionOwnership('unownedTestQuestion');
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_NOT_AUTHORIZED);
    });
  });
  
  describe('checkUserExists()', function () {
    it('should throw a \'' + ERROR_USER_DOES_NOT_EXIST + '\' error if a user with the given id does not exist', function () {
      try
      {
        MethodHelpers.checkUserExists('nonExistentUser');
      }
      catch(e) {}
      
      expect(Meteor.Error).toHaveBeenCalledWith(ERROR_USER_DOES_NOT_EXIST);
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
  
  describe('checkStudentInGroup()', function () {
    it('should throw a \'' + ERROR_NOT_IN_GROUP + '\' error if the student does not belong to the specified group', function () {
      spyOn(Users, 'findOne').and.returnValue(user);
      
      try
      {
        MethodHelpers.checkStudentInGroup('testUser', 'testGroup2');
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