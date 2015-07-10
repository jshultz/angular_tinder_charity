'use strict';

angular.module('charityApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('account', {
        url: '/account',
        templateUrl: 'app/profile/account.html',
        controller: 'ProfileCtrl',
        resolve: {
          user: function($stateParams, usersFactory, $firebaseObject, $firebaseAuth) {
          return usersFactory.getLoggedInStatus();
        }
      }})
      .state('charity', {
        url: '/account/charity',
        templateUrl: 'app/profile/charity.html',
        controller: 'ProfileCtrl',
        resolve: {
          user: function($stateParams, usersFactory, $firebaseObject, $firebaseAuth) {
          return usersFactory.getLoggedInStatus();
        }
      }})
      .state('profile', {
        url: '/account/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
      resolve: {
        user: function($stateParams, usersFactory, $firebaseObject, $firebaseAuth) {
          return usersFactory.getLoggedInStatus();
        }
      }});
  });