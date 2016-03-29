'use strict';

describe('ocDeleteQuestionCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var $reactive;
  var QuestionService;
  var scope;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _$reactive_, _QuestionService_, $rootScope) {
    $controller = _$controller_;
    $reactive = _$reactive_;
    QuestionService = _QuestionService_;
    scope = $rootScope.$new();
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocDeleteQuestionCtrl', {
      $scope: scope,
      $reactive: $reactive,
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
    spyOn(QuestionService, 'deleteQuestion');
    spyOn(window, 'confirm').and.returnValue(true);
  });
  
  // test cases  
  describe('delete()', function () {    
    it('should call QuestionService.deleteQuestion()', function() {
      controller.delete();
      
      expect(QuestionService.deleteQuestion).toHaveBeenCalledWith(controller.question._id);
    });
    
    it('should prompt the user to confirm that they would like to delete the group', function() {      
      controller.delete();
      
      expect(window.confirm).toHaveBeenCalled();
    });
  });
});