'use strict';

describe('ocCreateGroupCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  var groupName;
  var errorMessage
  
  // declare dependencies
  var $controller;
  var GroupService;
  var $state;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _GroupService_, _$state_) {
    $controller = _$controller_;
    GroupService = _GroupService_;
    $state = _$state_;
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocCreateGroupCtrl', {
      GroupService: GroupService
    });
    
    groupName = 'test group';
    errorMessage = 'error-message';
    
    // spies that won't change between tests
    spyOn($state, 'go');
    spyOn(window, 'alert');
  });
  
  // test cases  
  describe('create()', function () {    
    it('should call GroupService.createGroup()', function() {
      spyOn(GroupService, 'createGroup');
      
      controller.groupName = groupName;
      
      controller.create();
      
      expect(GroupService.createGroup).toHaveBeenCalledWith(groupName, jasmine.any(Function), jasmine.any(Function));
    });
    
    it('should prompt the user to enter a group name if none has been specified', function() {      
      controller.create();
      
      expect(window.alert).toHaveBeenCalled();
      
      controller.groupName = ' ';
      
      controller.create();
      
      expect(window.alert).toHaveBeenCalled();
    });
    
    it('should go to the \'home\' route if the group is created successfully', function () {
      spyOn(GroupService, 'createGroup').and.callFake(function (group, success, failure) {
        success();
      });
      
      controller.groupName = groupName;
      
      controller.create();
      
      expect($state.go).toHaveBeenCalledWith('home');
    });
    
    it('should alert the user if the group is not created', function () {
      spyOn(GroupService, 'createGroup').and.callFake(function (group, success, failure) {
        failure();
      });
      
      controller.create();
      
      expect(window.alert).toHaveBeenCalled();
    });
  });
});