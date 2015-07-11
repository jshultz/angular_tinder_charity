'use strict';

angular.module('charityApp', [
	'firebase',
  'flow',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, flowFactoryProvider) {
    $urlRouterProvider
      .otherwise('/');

    flowFactoryProvider.defaults = {
      permanentErrors: [404, 500, 501],
      maxChunkRetries: 1,
      chunkRetryInterval: 5000,
      simultaneousUploads: 4,
      singleFile: true
    };
    flowFactoryProvider.on('catchAll', function (event) {
      console.log('catchAll', arguments);
    });

    $locationProvider.html5Mode(true);
  });

 // for ui-router -- MAY NEED TO DELETE THIS
angular.module('charityApp').run(["$rootScope", "$state", function($rootScope, $state) {  
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    console.log('error', error);

    angular.log.error('error');

  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $state.go("main");
  }
});
}]);
