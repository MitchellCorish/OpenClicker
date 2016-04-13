'use strict';

describe('ocEditQuizCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  var question;
  var question2;
  
  // declare dependencies
  var $controller;
  var QuizService;
  var $state;
  var scope;
  var $reactive;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _QuizService_, _$state_, $rootScope, _$reactive_) {
    $controller = _$controller_;
    QuizService = _QuizService_;
    $state = _$state_;
    scope = $rootScope.$new();
    $reactive = _$reactive_;
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocEditQuizCtrl', {
      $scope: scope,
      $reactive: $reactive,
      QuizService: QuizService
    });
    
    question = 'testQuestion';
    question2 = 'testQuestion2';
    
    controller.quiz = {
      _id: 'testQuiz',
      groupId: 'testGroup',
      userId: 'testUser',
      name: 'test quiz',
      questions: [question, question, question]
    };
    
    controller.questions = [];
    
    // spies that won't change between tests
    spyOn($state, 'go');
    spyOn(window, 'alert');
  });
  
  // test cases
  describe('update()', function () {
    it('should call QuizService.editQuiz()', function() {
      spyOn(QuizService, 'editQuiz');
      
      controller.update();
      
      expect(QuizService.editQuiz).toHaveBeenCalledWith(controller.quiz._id, controller.quiz.questions, controller.quiz.userId, controller.quiz.name);
    });
  });
  
  describe('removeQuestion()', function () {
    it('should remove the specified question from the list of question', function () {
      spyOn(controller.quiz.questions, 'splice');
      
      var index = 0;
      
      controller.removeQuestion(index);
      
      expect(controller.quiz.questions.splice).toHaveBeenCalledWith(index, 1)
    });
  });
  
  describe('addAnswer()', function () {
    it('should push an answer into the list', function () {
      spyOn(controller.quiz.questions, 'push');
      
      controller.addQuestion(question);
      
      expect(controller.quiz.questions.push).toHaveBeenCalledWith(question);
    });
  });
  
  describe('up()', function () {
    it('should move the specified question up in the list', function () {
      controller.quiz.questions = [question, question2, question];
      
      controller.up(1);
      
      expect(controller.quiz.questions).toEqual([question2, question, question]);
    });
  });
  
  describe('down()', function () {
    it('should move the specified question down in the list', function () {
      controller.quiz.questions = [question, question2, question];
      
      controller.down(1);
      
      expect(controller.quiz.questions).toEqual([question, question, question2]);
    });
  });
});