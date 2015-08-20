'use strict';

angular.module('charityApp')
  .controller('CharitiesCtrl', function ($scope, charitiesFactory, $timeout) {
    $scope.message = 'Hello';

    $scope.cardflow={};
    // I use a timeout so I have access to all the elements
    $timeout(function(){
        $scope.$watch(function(){ return $scope.cardflow.current; }, function(){
            console.log($scope.cardflow);
        });
    }, 100);

    charitiesFactory.getCharities().then(function(response){
	    if (response != null) {
	      $scope.charities = response;
	    } else {
	      $scope.charities = '';
	    } // if (response != null)
	}); // getCharities

  });
