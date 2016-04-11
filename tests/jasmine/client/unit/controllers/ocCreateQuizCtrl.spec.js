'use strict';

describe('ocCreateQuizCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  var quizName;
  var groupId;
  var group;
  
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
    
    controller = $controller('ocCreateQuizCtrl', {
      QuizService: QuizService,
      $state: $state,
      $scope: scope,
      $reactive: $reactive
    });
    
    quizName = 'test quiz';
    groupId = 'testGroup';
    
    controller.quizName = quizName;
    controller.groupId = groupId;
    
    controller.group = {
      _id: 'testGroup',
      userId: 'testUser',
      name: 'test group'
    };
    
    // spies that won't change between tests
    spyOn($state, 'go');
    spyOn(window, 'alert');
  });
  
  // test cases  
  describe('create()', function () {    
    it('should call QuizService.createQuiz()', function() {
      spyOn(QuizService, 'createQuiz');
      
      controller.create();
      
      expect(QuizService.createQuiz).toHaveBeenCalledWith(quizName, groupId, jasmine.any(Function), jasmine.any(Function));
    });
    
    it('should prompt the user to enter a quiz name if none has been specified', function() {      
      controller.quizName = '';
      
      controller.create();
      
      expect(window.alert).toHaveBeenCalled();
      
      controller.quizName = ' ';
      
      controller.create();
      
      expect(window.alert).toHaveBeenCalled();
    });
    
    it('should go to the \'ownedQuizzes\' route if the quiz is created successfully', function () {
      spyOn(QuizService, 'createQuiz').and.callFake(function (quizName, groupId, success, failure) {
        success();
      });
      
      controller.create();
      
      expect($state.go).toHaveBeenCalledWith('ownedQuizzes', {
        groupId: controller.groupId
      });
    });
    
    it('should alert the user if the quiz is not created', function () {
      spyOn(QuizService, 'createQuiz').and.callFake(function (quizName, groupId, success, failure) {
        failure();
      });
      
      controller.create();
      
      expect(window.alert).toHaveBeenCalled();
    });
  });
});