'use strict';

describe('QuestionAnswerService', function () {
  beforeEach(module('openClicker'));
  
  var service;
  var questionId;
  var timestamp;
  var errorMessage;
  
  // inject dependencies
  beforeEach(inject(function (QuestionAnswerService) {
    service = QuestionAnswerService;
  }));
  
  // set up
  beforeEach(function () {
    
    questionId = 'testQuestion';
    timestamp = (Math.floor(Date.now() / 1000)+ 15);
    errorMessage = 'error message';
    
    // spies that won't change between tests
    spyOn(console, 'log');
    spyOn(window, 'alert');
  });
  
  // test cases  
  describe('answerQuestion()', function () {
    it('should call the answerQuestion Meteor method', function () {
      var answerQuestion = VelocityHelpers.spyOnMethod('answerQuestion');
      
      service.answerQuestion(questionId, 0, timestamp);
      
      expect(answerQuestion).toHaveBeenCalledWith(questionId, 0, timestamp);
    });
    
    it('should print errors to the console', function () {      
      VelocityHelpers.stubMethod('answerQuestion', { message: errorMessage }, null);

      service.answerQuestion(questionId, 0);

      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });
    
    it('should alert the user if it is successful', function () {
      VelocityHelpers.stubMethod('answerQuestion', null, true);
            
      service.answerQuestion(questionId, 0);

      expect(window.alert).toHaveBeenCalled();
    });
  });
});