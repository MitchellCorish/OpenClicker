(function () {
  'use-strict';
  
  angular.module('openClicker').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
    $stateProvider
      .state('answerQuestion', {
        url: '/answer-question/:questionId',
        templateUrl: 'client/templates/routes/answerQuestion.html',
        data: {
          rule: function () {
            if (!Meteor.userId() ||
                !Meteor.user().emails[0].verified)
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