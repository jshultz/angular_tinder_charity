'use strict';

angular.module('charityApp')
  .controller('ProfileCtrl', function ($scope, usersFactory, user) {
    $scope.message = 'Hello';

	usersFactory.getProfile(user).then(function(response){
		if (response != null) {
		  $scope.user = response;
		} else {
		  $scope.user = '';
		}
	})

  });
