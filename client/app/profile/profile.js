'use strict';

angular.module('charityApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/account/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
      resolve: {
        user: function($stateParams, usersFactory, $firebaseObject, $firebaseAuth) {
        	console.log('in here')
        	var ref = new Firebase("https://tinder-charity.firebaseio.com/");
        	return ref;
        }
      }});
  });