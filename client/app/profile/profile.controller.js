'use strict';

angular.module('charityApp')
  .controller('ProfileCtrl', function ($scope, usersFactory, user) {
    $scope.message = 'Hello';

    $scope.menu = [{
      'title': 'Edit your Profile',
      'link': '/account/profile'
    }, {
      'title': 'About',
      'link': '/about'
    }];

	usersFactory.getProfile(user).then(function(response){
		if (response != null) {
		  $scope.user = response;
		} else {
		  $scope.user = '';
		}
	})

  });
