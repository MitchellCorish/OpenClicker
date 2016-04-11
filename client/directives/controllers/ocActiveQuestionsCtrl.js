(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocActiveQuestionsCtrl', ocActiveQuestionsCtrl);
    
  ocActiveQuestionsCtrl.$inject = ['$scope', '$reactive'];
  
  function ocActiveQuestionsCtrl($scope, $reactive) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('activeQuestions');
    vm.subscribe('joinedGroups');
    
    vm.helpers({
      questions: () => Questions.find({
        groupId: vm.groupId
      }),
      group: () => Groups.findOne({
        _id: vm.groupId
      })
    });
  }
})();