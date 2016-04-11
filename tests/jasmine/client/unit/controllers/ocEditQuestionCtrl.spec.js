'use strict';

describe('ocEditQuestionCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var QuestionService;
  var $state;
  var scope;
  var $reactive;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _QuestionService_, _$state_, $rootScope, _$reactive_) {
    $controller = _$controller_;
    QuestionService = _QuestionService_;
    $state = _$state_;
    scope = $rootScope.$new();
    $reactive = _$reactive_;
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocEditQuestionCtrl', {
      $scope: scope,
      $reactive: $reactive,
      QuestionService: QuestionService
    });
    
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
    spyOn($state, 'go');
    spyOn(window, 'alert');
  });
  
  // test cases
  describe('update()', function () {
    it('should call QuestionService.editQuestion()', function() {
      spyOn(QuestionService, 'editQuestion');
      
      controller.update();
      
      expect(QuestionService.editQuestion).toHaveBeenCalledWith(controller.question._id, controller.question.groupId, controller.question.questionAsked, controller.question.possibleAnswers, controller.question.answer, jasmine.any(Function), jasmine.any(Function));
    });
    
    it('should go to the \'ownedQuestions\' route if the question is updated successfully', function () {
      spyOn(QuestionService, 'editQuestion').and.callFake(function (quizId, groupId, question, answers, correctAnswer, success, failure) {
        success();
      });
      
      controller.update();
      
      expect($state.go).toHaveBeenCalledWith('ownedQuestions', {
        quizId: controller.question.quizId,
        groupId: controller.question.groupId
      });
    });
    
    it('should alert the user if question creation fails', function () {
      spyOn(QuestionService, 'editQuestion').and.callFake(function (quizId, groupId, question, answers, correctAnswer, success, failure) {
        failure();
      });
      
      controller.update();
      
      expect(window.alert).toHaveBeenCalled();
    });  
  });
  
  describe('removeAnswer()', function () {
    it('should remove the specified answer from the list of answers', function () {
      spyOn(controller.question.possibleAnswers, 'splice');
      
      var index = 0;
      
      controller.removeAnswer(index);
      
      expect(controller.question.possibleAnswers.splice).toHaveBeenCalledWith(index, 1)
    });
  });
  
  describe('addAnswer()', function () {
    it('should push an answer into the list', function () {
      spyOn(controller.question.possibleAnswers, 'push');
      
      var answer = '42';
      
      controller.addAnswer(answer);
      
      expect(controller.question.possibleAnswers.push).toHaveBeenCalledWith(answer);
    });
  });
});