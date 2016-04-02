(function () {
    'use-strict';

    angular
        .module('openClicker')
        .controller('ocCreateQuizCtrl', ocCreateQuizCtrl);

    ocCreateQuizCtrl.$inject = ['QuizService', '$state', '$scope', '$reactive'];

    function ocCreateQuizCtrl(QuizService, $state, $scope, $reactive) {
        var vm = this;
        $reactive(vm).attach($scope);

        vm.subscribe('groups');
        vm.quizName = '';
        vm.create = create;

        vm.helpers({
                group: () => Groups.findOne({
                _id: vm.groupId
            })
    });


        function create()
        {
            if (vm.quizName.trim().length == 0)
            {
                alert('Please enter a name for the quiz');
            }
            else
            {
                QuizService.createQuiz(vm.quizName, vm.group._id, function () {
                    $state.go('home');
                }, function () {
                    alert('Failed to create quiz.');
                });
            }
        }
    }
})();
