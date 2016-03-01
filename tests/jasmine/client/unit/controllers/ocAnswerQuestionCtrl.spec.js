'use strict';

describe('ocAnswerQuestionCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var $reactive;
  var QuestionAnswerService;
  var scope;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _$reactive_, _QuestionAnswerService_, $rootScope) {
    $controller = _$controller_;
    $reactive = _$reactive_;
    QuestionAnswerService = _QuestionAnswerService_;
    scope = $rootScope.$new();
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocAnswerQuestionCtrl', {
      $scope: scope,
      $reactive: $reactive,
      QuestionAnswerService: QuestionAnswerService
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
    
    // spies that won't change between tests
    spyOn(QuestionAnswerService, 'answerQuestion');
    spyOn(window, 'alert');
  });
  
  // test cases  
  describe('answer()', function () {    
    it('should call the QuestionAnswerService if a valid answer is selected', function() {
      controller.selectedAnswer = controller.question.answer;
      
      controller.answer();
      
      expect(QuestionAnswerService.answerQuestion).toHaveBeenCalledWith('testQuestion', 1);
    });
    
    it('should prompt the user to select an answer if no answer or an invalid answer is selected', function() {
      controller.selectedAnswer = null;
      
      controller.answer();
      
      expect(window.alert).toHaveBeenCalled();
      
      controller.selectedAnswer = -1;
      
      controller.answer();
      
      expect(window.alert).toHaveBeenCalled();
      
      controller.selectedAnswer = controller.question.possibleAnswers.length;
      
      controller.answer();
      
      expect(window.alert).toHaveBeenCalled();
    });
  });
});