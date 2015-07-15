'use strict';

angular.module('charityApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('charities', {
        url: '/charities',
        templateUrl: 'app/charities/charities.html',
        controller: 'CharitiesCtrl'
      });
  });