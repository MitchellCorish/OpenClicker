(function () {
  'use-strict';
  
  angular.module('openClicker').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
    $stateProvider
      .state('home', {
        url: '/'
      });
      
    $urlRouterProvider.otherwise('/');
  });
})();