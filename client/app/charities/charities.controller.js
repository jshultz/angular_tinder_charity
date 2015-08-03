'use strict';

angular.module('charityApp')
  .controller('CharitiesCtrl', function ($scope) {
    $scope.message = 'Hello';

    charitiesFactory.getCharities().then(function(response){
    if (response != null) {
      $scope.charities = response;
    } else {
      $scope.charities = '';
    } // if (response != null)
    
  });
