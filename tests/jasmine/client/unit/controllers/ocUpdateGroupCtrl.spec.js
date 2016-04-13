'use strict';

describe('ocUpdateGroupCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var $reactive;
  var GroupService;
  var $state;
  var scope;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _$reactive_, _GroupService_, _$state_, $rootScope) {
    $controller = _$controller_;
    $reactive = _$reactive_;
    GroupService = _GroupService_;
    $state = _$state_;
    scope = $rootScope.$new();
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocUpdateGroupCtrl', {
      $scope: scope,
      $reactive: $reactive,
      GroupService: GroupService
    });
    
    // mock data
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
  describe('update()', function () {    
    it('should call GroupService.updateGroup()', function() {
      spyOn(GroupService, 'updateGroup');
      
      controller.update();
      
      expect(GroupService.updateGroup).toHaveBeenCalledWith(controller.group, jasmine.any(Function), jasmine.any(Function));
    });
    
    it('should prompt the user to enter a group name if none has been specified', function() {      
      controller.group.name = ' ';
      
      controller.update();
      
      expect(window.alert).toHaveBeenCalled();
    });
    
    it('should go to the \'home\' route if the group is updated successfully', function () {
      spyOn(GroupService, 'updateGroup').and.callFake(function (group, success, failure) {
        success();
      });
      
      controller.update();
      
      expect($state.go).toHaveBeenCalledWith('home');
    });
    
    it('should alert the user if the group is not updated', function () {
      spyOn(GroupService, 'updateGroup').and.callFake(function (group, success, failure) {
        failure();
      });
      
      controller.update();
      
      expect(window.alert).toHaveBeenCalled();
    });
  });
});