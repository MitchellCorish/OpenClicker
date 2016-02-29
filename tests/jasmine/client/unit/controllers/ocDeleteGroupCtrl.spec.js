'use strict';

describe('ocDeleteGroupCtrl', function () {
  beforeEach(module('openClicker'));
  
  var controller;
  
  // declare dependencies
  var $controller;
  var $reactive;
  var GroupService;
  var scope;

  // inject dependencies
  beforeEach(inject(function (_$controller_, _$reactive_, _GroupService_, $rootScope) {
    $controller = _$controller_;
    $reactive = _$reactive_;
    GroupService = _GroupService_;
    scope = $rootScope.$new();
  }));
  
  // set up
  beforeEach(function () {  
    
    controller = $controller('ocDeleteGroupCtrl', {
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
    spyOn(GroupService, 'deleteGroup');
    spyOn(window, 'confirm').and.returnValue(true);
  });
  
  // test cases  
  describe('delete()', function () {    
    it('should call GroupService.deleteGroup()', function() {
      controller.delete();
      
      expect(GroupService.deleteGroup).toHaveBeenCalledWith(controller.group._id);
    });
    
    it('should prompt the user to confirm that they would like to delete the group', function() {      
      controller.delete();
      
      expect(window.confirm).toHaveBeenCalled();
    });
  });
});