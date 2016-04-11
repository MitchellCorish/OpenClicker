'use strict';

describe('ocDeleteQuizCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var $reactive;
  var QuizService;
  var scope;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _$reactive_, _QuizService_, $rootScope) {
    $controller = _$controller_;
    $reactive = _$reactive_;
    QuizService = _QuizService_;
    scope = $rootScope.$new();
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocDeleteQuizCtrl', {
      $scope: scope,
      $reactive: $reactive,
      QuizService: QuizService
    });
    
    // mock data
    controller.quiz = {
      _id: 'testQuiz',
      userId: 'testUser',
      groupId: 'testGroup',
      name: 'test group'
    };
    
    // spies that won't change between tests
    spyOn(QuizService, 'deleteQuiz');
    spyOn(window, 'confirm').and.returnValue(true);
  });
  
  // test cases  
  describe('delete()', function () {    
    it('should call QuizService.deleteQuiz()', function() {
      controller.delete();
      
      expect(QuizService.deleteQuiz).toHaveBeenCalledWith(controller.quiz._id);
    });
    
    it('should prompt the user to confirm that they would like to delete the quiz', function() {      
      controller.delete();
      
      expect(window.confirm).toHaveBeenCalled();
    });
  });
});