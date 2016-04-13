(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('ocOwnedQuestionsCtrl', ocOwnedQuestionsCtrl);
    
  ocOwnedQuestionsCtrl.$inject = ['$scope', '$reactive'];
  
  function ocOwnedQuestionsCtrl($scope, $reactive) {
    var vm = this;
    $reactive(vm).attach($scope);
    
    vm.subscribe('ownedQuestions');
    vm.subscribe('ownedQuizzes')
    
    vm.helpers({
      questions: () => Questions.find({
        userId: Meteor.userId()
      }),
      quiz: () => Quizzes.findOne({
        _id: vm.quizId
      }),
    });
  }
})();