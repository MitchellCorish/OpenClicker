(function () {
  'use-strict';
  
  angular.module('openClicker').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
    $stateProvider
      .state('createGroup', {
        url: '/create-group',
        templateUrl: 'client/templates/routes/createGroup.html',
        data: {
          rule: function () {
            if (!Meteor.userId() ||
                !Meteor.user().emails[0].verified ||
                !Roles.userIsInRole(Meteor.userId(), PROFESSOR_ROLE, Roles.GLOBAL_GROUP))
            {
              return {
                to: 'home',
                params: {}
              }
            }
          }
        }
      })
      .state('home', {
        url: '/',
        templateUrl: 'client/templates/routes/home.html'
      });
      
    $urlRouterProvider.otherwise('/');
  });
})();