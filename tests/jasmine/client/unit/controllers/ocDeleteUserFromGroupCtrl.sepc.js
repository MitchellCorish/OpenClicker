'use strict';

describe('ocDeleteUserFromGroupCtrl', function () {
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
    
    controller = $controller('ocDeleteUserFromGroupCtrl', {
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
    
    controller.user = {
        _id: 'testUser',
        username: 'testUserName',
    }
    
    controller.groupId = controller.group._id;
    
    // spies that won't change between tests
    spyOn(GroupMembershipService, 'deleteUserFromGroup');
    spyOn(window, 'confirm').and.returnValue(true);
  });
  
  // test cases  
  describe('deleteUser()', function () {    
    it('should call GroupMembershipService.deleteUserFromGroup()', function() {
      controller.deleteUser();
      
      expect(GroupMembershipService.deleteUserFromGroup).toHaveBeenCalledWith(controller.user._id, controller.group._id);
    });
    
    it('should prompt the user to confirm that they would like to delete the user from the group', function() {      
      controller.deleteUser();
      
      expect(window.confirm).toHaveBeenCalled();
    });
  });
});