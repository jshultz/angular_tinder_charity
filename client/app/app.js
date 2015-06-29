'use strict';

angular.module('charityApp', [
	'firebase',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

 // for ui-router -- MAY NEED TO DELETE THIS
angular.module('charityApp').run(["$rootScope", "$state", function($rootScope, $state) {
	console.log('$rootScope', $rootScope)
$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
  // We can catch the error thrown when the $requireAuth promise is rejected
  // and redirect the user back to the home page
  if (error === "AUTH_REQUIRED") {
    $state.go("home");
  }
});
}]);
