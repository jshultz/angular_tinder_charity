'use strict';

angular.module('charityApp')
  .controller('RegisterCtrl', function ($scope, RegisterFactory, usersFactory, $timeout, $location, flash) {
    $scope.message = 'Hello';

    $scope.submit = function(formModel){

    	usersFactory.createAccount(formModel).then(function(result) {
    		if (result != 'error') {
                formModel['uid'] = result
                usersFactory.userCreateCallback(formModel)
                flash.success = 'Congratulations, you can log in now!';
				$timeout(function(){
					$location.path('/login');
				},1); // timeout
    		} else {
                flash.error = "Something went wrong! #{result}";
    			console.log('result', result);
    		} // if result
    	})
    }

  });
