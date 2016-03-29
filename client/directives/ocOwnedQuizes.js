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
            templateUrl: 'client/templates/ocOwnedQuizes.html',
            restrict: 'E',
            scope: {},
            bindToController: true
        };

        return directive;
    }
})();