'use strict';

describe('ocUpdateGroupCtrl', function () {
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
    spyOn(GroupService, 'updateGroup');
  });
  
  // test cases  
  describe('update()', function () {    
    it('should call GroupService.updateGroup()', function() {
      controller.update();
      
      expect(GroupService.updateGroup).toHaveBeenCalledWith(controller.group);
    });
  });
});