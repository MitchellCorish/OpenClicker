'use strict';

describe('ocJoinGroupCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  var groupId;
  
  // declare dependencies
  var $controller;
  var GroupMembershipService;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _GroupMembershipService_) {
    $controller = _$controller_;
    GroupMembershipService = _GroupMembershipService_;
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocJoinGroupCtrl', {
      GroupMembershipService: GroupMembershipService
    });
    
    groupId = 'testGroup';
    
    // spies that won't change between tests
    spyOn(GroupMembershipService, 'joinGroup');
  });
  
  // test cases  
  describe('join()', function () {    
    it('should call GroupMembershipService.joinGroup()', function() {
      controller.groupId = groupId;
      
      controller.join();
      
      expect(GroupMembershipService.joinGroup).toHaveBeenCalledWith(groupId);
    });
  });
});