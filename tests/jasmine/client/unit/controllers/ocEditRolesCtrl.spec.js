'use strict';

describe('ocEditRolesCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var $reactive;
  var RolesService;
  var $state;
  var scope;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _$reactive_, _RolesService_, _$state_, $rootScope) {
    $controller = _$controller_;
    $reactive = _$reactive_;
    RolesService = _RolesService_;
    $state = _$state_;
    scope = $rootScope.$new();
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocEditRolesCtrl', {
      $scope: scope,
      $reactive: $reactive,
      RolesService: RolesService
    });
    
    // mock data
    controller.userId = 'testUser';
    
    // spies that won't change between tests
    spyOn($state, 'go');
    spyOn(window, 'alert');
  });
  
  // test cases  
  describe('update()', function () {    
    it('should call RolesService.updateRoles()', function() {
      spyOn(RolesService, 'updateRoles');
      
      controller.update();
      
      expect(RolesService.updateRoles).toHaveBeenCalledWith(controller.userId, jasmine.any(Boolean), jasmine.any(Boolean), jasmine.any(Boolean), jasmine.any(Function), jasmine.any(Function));
    });
    
    it('should go to the \'home\' route if the user\'s roles are updated successfully', function () {
      spyOn(RolesService, 'updateRoles').and.callFake(function (userId, student, professor, admin, success, failure) {
        success();
      });
      
      controller.update();
      
      expect($state.go).toHaveBeenCalledWith('home');
    });
    
    it('should alert the user if the user\'s roles are not updated', function () {
      spyOn(RolesService, 'updateRoles').and.callFake(function (userId, student, professor, admin, success, failure) {
        failure();
      });
      
      controller.update();
      
      expect(window.alert).toHaveBeenCalled();
    });
  });
});