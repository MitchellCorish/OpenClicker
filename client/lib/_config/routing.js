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
      .state('createQuestion', {
        url: '/create-question',
        templateUrl: 'client/templates/routes/createQuestion.html',
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
        templateUrl: 'client/templates/routes/home.html',
        data: {
          rule: function () {
            if (!Meteor.userId() ||
                !Meteor.user().emails[0].verified)
            {
              return {
                to: 'welcome',
                params: {}
              }
            }
          }
        }
      })
      .state('updateQuestion', {
        url: '/update-question/:questionId',
        templateUrl: 'client/templates/routes/updateQuestion.html',
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
      .state('updateGroup', {
        url: '/update-group/:groupId',
        templateUrl: 'client/templates/routes/updateGroup.html',
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
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'client/templates/routes/welcome.html'
      });
      
    $urlRouterProvider.otherwise('/');
  });
})();