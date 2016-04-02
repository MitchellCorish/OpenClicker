(function () {
    'use-strict';

    angular
        .module('openClicker')
        .controller('ocGroupSummaryCtrl', ocGroupSummaryCtrl);

    ocGroupSummaryCtrl.$inject = ['$scope', '$reactive', 'QuizService', '$state'];

    function ocGroupSummaryCtrl($scope, $reactive, QuizService, $state) {
        var vm = this;
        $reactive(vm).attach($scope);

        vm.subscribe('groups');
        vm.subscribe('users');
        vm.subscribe('ownedQuizes');
        vm.subscribe('ownedQuestions');




        vm.helpers({
            users: () => Users.find({
               // groupId: vm.groupId
            }),
            quizes: () => Quizes.find({
                 userId: Meteor.userId()
            }),
            questions: () => Questions.find({
                 userId: Meteor.userId()
            })
         });


    }
})();