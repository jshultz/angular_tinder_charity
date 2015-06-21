'use strict';

angular.module('charityApp')
  .controller('RegisterCtrl', function ($scope, RegisterFactory, usersFactory) {
    $scope.message = 'Hello';

    $scope.submit = function(formModel){

    	usersFactory.createAccount(formModel).then(function(result) {
    		console.log('result', result);
    	})
    }

  });
