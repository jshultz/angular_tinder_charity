'use strict';

angular.module('charityApp')
  .controller('RegisterCtrl', function ($scope, RegisterFactory, usersFactory, $timeout, $location, flash) {
    $scope.message = 'Hello';

    $scope.submit = function(formModel){

    	usersFactory.createAccount(formModel).then(function(result) {
    		if (result == 'success') {
                formModel['uid'] = result
                flash.success = 'Congratulations, you can log in now!';
				$timeout(function(){
					$location.path('/login');
				},1); // timeout
    		} else {
                flash.error = "Something went wrong! " + result;
    			console.log('result', result);
                $timeout(function(){
                    $location.path('/register');
                },1); // timeout
    		} // if result
    	})
    }

  });
