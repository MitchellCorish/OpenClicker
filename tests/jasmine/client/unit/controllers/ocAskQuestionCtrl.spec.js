'use strict';

describe('ocAskQuestionCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  var now;
  
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
    
    controller = $controller('ocAskQuestionCtrl', {
      $scope: scope,
      $reactive: $reactive,
      $timeout: $timeout,
      QuestionAnswerService: QuestionService
    });
    
    // mock data
    controller.question = {
      _id: 'testQuestion',
      groupId: 'testGroup',
      questionAsked: 'what is 2 + 2?',
      possibleAnswers: ['11', '4', '5'],
      answer: 1,
      userId: 'testUser',
      active: true
    };
    
    controller.questionId = controller.question._id;
    
    // use a common time for everything so we know what value should be used
    // when a start/end time is updated
    now = Date.now();
    
    // spies that won't change between tests
    spyOn(QuestionService, 'updateQuestionStartTime');
    spyOn(QuestionService, 'updateQuestionEndTime');
    spyOn(window, 'alert');
    spyOn(Date, 'now').and.returnValue(now);
    spyOn(controller, 'onTimeout').and.callThrough();
  });
  
  // test cases  
  describe('start()', function () {
    it('should set the start time to the current time and the end time to 0 if the question is not active', function() {
      controller.active = false;
      
      controller.start();
      
      expect(QuestionService.updateQuestionStartTime).toHaveBeenCalledWith(controller.questionId, Math.floor(now / 1000));
      expect(QuestionService.updateQuestionEndTime).toHaveBeenCalledWith(controller.questionId, 0);
    });
  });
  
  describe('stop()', function () {
    it('should set the end time to the current time if the question is active', function() {
      controller.active = true;
      
      controller.stop();
      
      expect(QuestionService.updateQuestionEndTime).toHaveBeenCalledWith(controller.questionId, Math.floor(now / 1000));
    });
  });
  
  describe('startTimer()', function () {    
    it('should set the start time to the current time and the end time to 0 if the question is not active', function() {
      controller.active = false;
      
      controller.startTimer();
      
      expect(QuestionService.updateQuestionStartTime).toHaveBeenCalledWith(controller.questionId, Math.floor(now / 1000));
      expect(QuestionService.updateQuestionEndTime).toHaveBeenCalledWith(controller.questionId, 0);
    });
    
    it('should set the onTimeout method to be called', function() {
      controller.active = false;
      
      controller.startTimer();
      
      $timeout.flush();
      
      expect(controller.onTimeout).toHaveBeenCalled();
    });
  });
  
  describe('onTimeout()', function () {
    it('should decrease the counter by one and set itself to be called again if the counter is not 0', function () {
      controller.counter = 1;
      
      controller.onTimeout();
      
      expect(controller.counter).toEqual(0);
      
      $timeout.flush();
      
      expect(controller.onTimeout.calls.count()).toEqual(2);
    });
    
    it('should set the end time to the current time, and reset the counter, active, and usingTimer if the counter is 0', function () {
      controller.counter = 0;
      
      controller.onTimeout();
      
      expect(QuestionService.updateQuestionEndTime).toHaveBeenCalledWith(controller.questionId, Math.floor(now / 1000));
      expect(controller.counter).toEqual(30);
      expect(controller.active).toBe(false);
      expect(controller.usingTimer).toBe(false);
    });
  });
});