(function () {
  'use-strict';
  
  angular.module('openClicker').config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    
    $stateProvider
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
      .state('welcome', {
        url: '/welcome',
        templateUrl: 'client/templates/routes/welcome.html'
      });
      
    $urlRouterProvider.otherwise('/');
  });
  
  // modified from ui-router FAQ (https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions#how-to-create-rules-to-prevent-access-to-a-state)
  angular.module('openClicker').run(function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(e, to) {
      if (to.data)
      {
        if (!angular.isFunction(to.data.rule))
        {
          return;
        }
        else
        {
          var result = to.data.rule();

          if (result && result.to) {
            e.preventDefault();
            // Optionally set option.notify to false if you don't want 
            // to retrigger another $stateChangeStart event
            // Note:  templates seem to not always load properly if
            // option.notify is false
            $state.go(result.to, result.params, {notify: true});
          }
        }
      }
    });
  });
})();