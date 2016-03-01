'use strict';

describe('ocCreateGroupCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  var groupName;
  
  // declare dependencies
  var $controller;
  var GroupService;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _GroupService_) {
    $controller = _$controller_;
    GroupService = _GroupService_;
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocCreateGroupCtrl', {
      GroupService: GroupService
    });
    
    groupName = 'test group';
    
    // spies that won't change between tests
    spyOn(GroupService, 'createGroup');
    spyOn(window, 'alert');
  });
  
  // test cases  
  describe('create()', function () {    
    it('should call GroupService.createGroup()', function() {
      controller.groupName = groupName;
      
      controller.create();
      
      expect(GroupService.createGroup).toHaveBeenCalledWith(groupName);
    });
    
    it('should prompt the user to enter a group name if none has been specified', function() {      
      controller.create();
      
      expect(window.alert).toHaveBeenCalled();
      
      controller.groupName = ' ';
      
      controller.create();
      
      expect(window.alert).toHaveBeenCalled();
    });
  });
});