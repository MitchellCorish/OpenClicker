'use strict';

describe('QuestionService', function () {
  beforeEach(module('openClicker'));
  
  var service;
  var question;
  var success;
  var failure;
  var errorMessage;
  
  // inject dependencies
  beforeEach(inject(function (QuestionService) {
    service = QuestionService;
  }));
  
  // set up
  beforeEach(function () {
    
    question = {
      _id: 'testQuestion',
      groupId: 'testGroup',
      quizId: 'testQuiz',
      questionAsked: 'what is 2 + 2?',
      possibleAnswers: ['11', '4', '5'],
      answer: 1,
      userId: 'testUser',
      active: true
    };
    
    errorMessage = 'error message';
    
    // spies that won't change between tests
    spyOn(console, 'log');
    spyOn(window, 'alert');
    success = jasmine.createSpy('success');
    failure = jasmine.createSpy('failure');
  });
  
  // test cases
  describe('createQuestion()', function () {
    it('should call the createQuestion Meteor method', function () {
      var createQuestion = VelocityHelpers.spyOnMethod('createQuestion');
      
      service.createQuestion(question.quizId, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);
      
      expect(createQuestion).toHaveBeenCalledWith(question.quizId, question.groupId, question.questionAsked, question.possibleAnswers, question.answer);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('createQuestion', { message: errorMessage }, null);

      service.createQuestion(question.quizId, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
    
    it('should call the success callback when the createQuestion Meteor method is successful', function () {
      VelocityHelpers.stubMethod('createQuestion', null, true);
      
      service.createQuestion(question.quizId, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);
      
      expect(success).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the createQuestion Meteor method is not successful', function () {
      VelocityHelpers.stubMethod('createQuestion', null, false);
      
      service.createQuestion(question.quizId, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the createQuestion Meteor method throws an error', function () {
      VelocityHelpers.stubMethod('createQuestion', { message: errorMessage }, null);
      
      service.createQuestion(question.quizId, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
  });
  
  describe('updateQuestionStartTime()', function () {
    it('should call the updateQuestionStartTime Meteor method', function () {
      var updateQuestionStartTime = VelocityHelpers.spyOnMethod('updateQuestionStartTime');
      
      service.updateQuestionStartTime(question._id, 0);
      
      expect(updateQuestionStartTime).toHaveBeenCalledWith(question._id, 0);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('updateQuestionStartTime', { message: errorMessage }, null);

      service.updateQuestionStartTime(question._id, 0);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('updateQuestionEndTime()', function () {
    it('should call the updateQuestionEndTime Meteor method', function () {
      var updateQuestionEndTime = VelocityHelpers.spyOnMethod('updateQuestionEndTime');
      
      service.updateQuestionEndTime(question._id, 0);
      
      expect(updateQuestionEndTime).toHaveBeenCalledWith(question._id, 0);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('updateQuestionEndTime', { message: errorMessage }, null);

      service.updateQuestionEndTime(question._id, 0);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('deleteQuestion()', function () {
    it('should call the deleteQuestion Meteor method', function () {
      var deleteQuestion = VelocityHelpers.spyOnMethod('deleteQuestion');
      
      service.deleteQuestion(question._id);
      
      expect(deleteQuestion).toHaveBeenCalledWith(question._id);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('deleteQuestion', { message: errorMessage }, null);

      service.deleteQuestion(question._id);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
  });
  
  describe('editQuestion()', function () {
    it('should call the editQuestion Meteor method', function () {
      var editQuestion = VelocityHelpers.spyOnMethod('editQuestion');
      
      service.editQuestion(question._id, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);
      
      expect(editQuestion).toHaveBeenCalledWith(question._id, question.groupId, question.questionAsked, question.possibleAnswers, question.answer);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('editQuestion', { message: errorMessage }, null);

      service.editQuestion(question._id, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
    
    it('should call the success callback when the editQuestion Meteor method is successful', function () {
      VelocityHelpers.stubMethod('editQuestion', null, true);
      
      service.editQuestion(question._id, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);
      
      expect(success).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the editQuestion Meteor method is not successful', function () {
      VelocityHelpers.stubMethod('editQuestion', null, false);
      
      service.editQuestion(question._id, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
    
    it('should call the failure callback when the editQuestion Meteor method throws an error', function () {
      VelocityHelpers.stubMethod('editQuestion', { message: errorMessage }, null);
      
      service.editQuestion(question._id, question.groupId, question.questionAsked, question.possibleAnswers, question.answer, success, failure);
      
      expect(failure).toHaveBeenCalled();
    });
  });
});