(function () {
    'use strict';

    angular
        .module('openClicker')
        .directive('ocOwnedQuizes', ocOwnedQuizes);

    ocOwnedQuizes.$inject = [];

    function ocOwnedQuizes() {
        var directive = {
            controller: 'ocOwnedQuizesCtrl',
            controllerAs: 'vm',
            templateUrl: 'client/templates/directives/ocOwnedQuizes.html',
            restrict: 'E',
            scope: {
                groupId: '@'
            },
            bindToController: true
        };

        return directive;
    }
})();