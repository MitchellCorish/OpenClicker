(function () {
    'use-strict';

    angular
        .module('openClicker')
        .controller('ocOwnedQuizesCtrl', ocOwnedQuizesCtrl);

    ocOwnedQuizesCtrl.$inject = ['$scope', '$reactive'];

    function ocOwnedQuizesCtrl($scope, $reactive) {
        var vm = this;
        $reactive(vm).attach($scope);

        vm.subscribe('groups');
        vm.subscribe('ownedQuizes');

        vm.helpers({
                quizes: () => Quizes.find({
                userId: Meteor.userId()
                }),
                group: () => Groups.findOne({
                _id: vm.groupId
                }),
    });
    }
})();