'use strict';

angular.module('charityApp')
  .controller('RegisterCtrl', function ($scope, RegisterFactory, usersFactory, $timeout, $location) {
    $scope.message = 'Hello';

    $scope.submit = function(formModel){

    	usersFactory.createAccount(formModel).then(function(result) {
    		if (result == 'created') {
				$timeout(function(){
					$location.path('/login');
				},1); // timeout
    		} else {
    			console.log('result', result);
    		} // if result
    	})
    }

  });
