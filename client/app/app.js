'use strict';

angular.module('charityApp', [
	'firebase',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
  'angular-flash.service',
  'angular-flash.flash-alert-directive',
  'angular-cardflow'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, flashProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    // Support bootstrap 3.0 "alert-danger" class with error flash types
    flashProvider.errorClassnames.push('alert-danger');

    /**
     * Also have...
     *
     * flashProvider.warnClassnames
     * flashProvider.infoClassnames
     * flashProvider.successClassnames
     */
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
