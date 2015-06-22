'use strict';

angular.module('charityApp')
  .controller('LoginCtrl', function ($scope, $timeout, $location, usersFactory) {
    $scope.message = 'Hello';

    $scope.submit = function(formModel){

    	usersFactory.loginAccount(formModel).then(function(result) {
    		if (result == 'created') {
				$timeout(function(){
					$location.path('/login');
				},1); // timeout
    		} else {
    			console.log('result', result);
    		} // if result
    	})
    } // submit


  });
