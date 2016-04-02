(function () {
  'use-strict';
  
  angular
    .module('openClicker')
    .controller('groupSummaryCtrl', groupSummaryCtrl);
    
  groupSummaryCtrl.$inject = ['$stateParams'];
  
  function groupSummaryCtrl($stateParams) {
    var vm = this;
    
    vm.groupId = $stateParams.groupId;
  }
})();