'use strict';

describe('ocLeaveGroupCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var $reactive;
  var GroupMembershipService;
  var scope;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _$reactive_, _GroupMembershipService_, $rootScope) {
    $controller = _$controller_;
    $reactive = _$reactive_;
    GroupMembershipService = _GroupMembershipService_;
    scope = $rootScope.$new();
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocLeaveGroupCtrl', {
      $scope: scope,
      $reactive: $reactive,
      GroupMembershipService: GroupMembershipService
    });
    
    // mock data
    controller.group = {
      _id: 'testGroup',
      userId: 'testUser',
      name: 'test group'
    };
    
    // spies that won't change between tests
    spyOn(GroupMembershipService, 'leaveGroup');
    spyOn(window, 'confirm').and.returnValue(true);
  });
  
  // test cases  
  describe('leave()', function () {    
    it('should call GroupMembershipService.leaveGroup()', function() {
      controller.leave();
      
      expect(GroupMembershipService.leaveGroup).toHaveBeenCalledWith(controller.group._id);
    });
    
    it('should prompt the user to confirm that they would like to leave the group', function() {      
      controller.leave();
      
      expect(window.confirm).toHaveBeenCalled();
    });
  });
});