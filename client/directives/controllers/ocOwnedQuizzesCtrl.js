(function () {
  'use-strict';

  angular
    .module('openClicker')
    .controller('ocOwnedQuizzesCtrl', ocOwnedQuizesCtrl);

  ocOwnedQuizesCtrl.$inject = ['$scope', '$reactive'];

  function ocOwnedQuizesCtrl($scope, $reactive) {
    var vm = this;
    $reactive(vm).attach($scope);

    vm.subscribe('groups');
    vm.subscribe('ownedQuizzes');

    vm.helpers({
      quizzes: () => Quizzes.find({
        userId: Meteor.userId()
      }),
      group: () => Groups.findOne({
        _id: vm.groupId
      }),
    });
  }
})();