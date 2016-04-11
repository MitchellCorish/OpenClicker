'use strict';

describe('QuizService', function () {
  beforeEach(module('openClicker'));
  
  var service;
  var quiz;
  var success;
  var failure;
  var errorMessage;
  
  // inject dependencies
  beforeEach(inject(function (QuizService) {
    service = QuizService;
  }));
  
  // set up
  beforeEach(function () {
    
    quiz = {
      _id: 'testQuiz',
      groupId: 'testGroup',
      userId: 'testUser',
      name: 'test quiz',
      questions: []
    };
    
    errorMessage = 'error message';
    
    // spies that won't change between tests
    spyOn(console, 'log');
    spyOn(window, 'alert');
    success = jasmine.createSpy('success');
    failure = jasmine.createSpy('failure');
  });
  
  // test cases
  describe('createQuiz()', function () {
    it('should call the createQuiz Meteor method', function () {
      var createQuiz = VelocityHelpers.spyOnMethod('createQuiz');
      
      service.createQuiz(quiz.name, quiz.groupId, success, failure);
      
      expect(createQuiz).toHaveBeenCalledWith(quiz.name, quiz.groupId);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('createQuiz', { message: errorMessage }, null);

      service.createQuiz(quiz.name, quiz.groupId, success, failure);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
    
    it('should call the success callback when the createQuiz Meteor method is successful', function () {
      VelocityHelpers.stubMethod('createQuiz', null, true);
      
      service.createQuiz(quiz.name, quiz.groupId, success, failure);
      
      expect(success).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the createQuiz Meteor method is not successful', function () {
      VelocityHelpers.stubMethod('createQuiz', null, false);
      
      service.createQuiz(quiz.name, quiz.groupId, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the createQuiz Meteor method throws an error', function () {
      VelocityHelpers.stubMethod('createQuiz', { message: errorMessage }, null);
      
      service.createQuiz(quiz.name, quiz.groupId, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
  });
  
  describe('deleteQuiz()', function () {
    it('should call the deleteQuiz Meteor method', function () {
      var deleteQuiz = VelocityHelpers.spyOnMethod('deleteQuiz');
      
      service.deleteQuiz(quiz._id);
      
      expect(deleteQuiz).toHaveBeenCalledWith(quiz._id);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('deleteQuiz', { message: errorMessage }, null);

      service.deleteQuiz(quiz._id);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('editQuiz()', function () {
    it('should call the editQuiz Meteor method', function () {
      var editQuiz = VelocityHelpers.spyOnMethod('editQuiz');
      
      service.editQuiz(quiz._id, quiz.questions, quiz.userId, quiz.name);
      
      expect(editQuiz).toHaveBeenCalledWith(quiz._id, quiz.questions, quiz.userId, quiz.name);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('editQuiz', { message: errorMessage }, null);

      service.editQuiz(quiz._id, quiz.questions, quiz.userId, quiz.name);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
    
    it('should alert the user when the editQuestion Meteor method is successful', function () {
      VelocityHelpers.stubMethod('editQuiz', null, true);
      
      service.editQuiz(quiz._id, quiz.questions, quiz.userId, quiz.name);
      
      expect(window.alert).toHaveBeenCalled();
    });
  });
});