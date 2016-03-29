'use strict';

describe('ocCounterCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var $reactive;
  var $timeout;
  var QuestionService;
  var scope;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _$reactive_, _$timeout_, _QuestionService_, $rootScope) {
    $controller = _$controller_;
    $reactive = _$reactive_;
    $timeout = _$timeout_;
    QuestionService = _QuestionService_;
    scope = $rootScope.$new();
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocCounterCtrl', {
      $scope: scope,
      $reactive: $reactive,
      $timeout: $timeout,
      QuestionService: QuestionService
    });
    
    // mock data
    controller.question = {
      _id: 'testQuestion',
      userId: 'testUser',
      groupId: 'test group',
      questionAsked: "TEST QUESTION",
      possibleAnswers: ["answer1", "answer2"],
      answer: 0,
      active: false
    };
    
    // spies that won't change between tests
    spyOn(QuestionService, 'updateQuestionStartTime');
    spyOn(QuestionService, 'updateQuestionEndTime');
  });
  
  // test cases  
  describe('startTimer()', function () {    
    it('should call QuestionService.updateQuestionStartTime() and QuestionService.updateQuestionEndTime()', function() {
      controller.startTimer();
      
      expect(QuestionService.updateQuestionStartTime).toHaveBeenCalledWith(controller.questionId, controller.startTime);
      expect(QuestionService.updateQuestionEndTime).toHaveBeenCalledWith(controller.questionId, 0);
    });
    
    
    
    it('should call QuestionService.updateQuestionEndTime()', function() {
      controller.counter = 0;
      controller.onTimeout();
      expect(QuestionService.updateQuestionEndTime).toHaveBeenCalledWith(controller.questionId, controller.endTime);
    });
  });
});