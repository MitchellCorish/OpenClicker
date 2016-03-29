'use strict';

describe('ocUpdateUserCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var $reactive;
  var UserService;
  var $state;
  var scope;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _$reactive_, _UserService_, _$state_, $rootScope) {
    $controller = _$controller_;
    $reactive = _$reactive_;
    UserService = _UserService_;
    $state = _$state_;
    scope = $rootScope.$new();
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocUpdateUserCtrl', {
      $scope: scope,
      $reactive: $reactive,
      UserService: UserService
    });
    
    // mock data
    controller.user = {
      _id: 'testUser',
      username: 'test user',
      "profile.institution": 'testInstitution',
      "profile.faculty": 'testFaculty',
      "profile.studentId": '666666',
    };
    
    // spies that won't change between tests
    spyOn($state, 'go');
    spyOn(window, 'alert');
  });
  
  // test cases  
  describe('update()', function () {    
    it('should call UserService.updateUser()', function() {
      spyOn(UserService, 'updateUser');
      
      controller.update();
      
      expect(UserService.updateUser).toHaveBeenCalledWith(controller.user, jasmine.any(Function), jasmine.any(Function));
    });
    
    it('should prompt the user to enter a user name if none has been specified', function() {      
      controller.user.username = ' ';
      
      controller.update();
      
      expect(window.alert).toHaveBeenCalled();
    });
    
    it('should go to the \'home\' route if the user is updated successfully', function () {
      spyOn(UserService, 'updateUser').and.callFake(function (user, success, failure) {
        success();
      });
      
      controller.update();
      
      expect($state.go).toHaveBeenCalledWith('home');
    });
    
    it('should alert the user if the user is not updated', function () {
      spyOn(UserService, 'updateUser').and.callFake(function (user, success, failure) {
        failure();
      });
      
      controller.update();
      
      expect(window.alert).toHaveBeenCalled();
    });
  });
});