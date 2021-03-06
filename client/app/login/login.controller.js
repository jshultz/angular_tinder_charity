'use strict';

angular.module('charityApp')
  .controller('LoginCtrl', function ($scope, $timeout, $location, usersFactory, $rootScope, flash) {
    $scope.message = 'Hello';
    $scope.flash = flash;

    var ref = new Firebase("https://tinder-charity.firebaseio.com/");

    function authDataCallback(authData) {
        if (authData) {
            $rootScope.loggedIn = true;
            $scope.loggedIn = true;
            $rootScope.displayName = usersFactory.getName(authData);
            usersFactory.getAccessLevel(authData).then(function(response) {
              if ( response == 1) {
                $rootScope.admin = true;
              } else {
                $rootScope.admin = false;
              }
            });
        } else {
            $rootScope.loggedIn = false;
            $rootScope.displayName = ''
        }
    } // authDataCallback

    function userExistsCheck(authData) {
      usersFactory.checkIfUserExists(authData).then(function(response){
        if (response == 'created') { // new user created
          var onComplete = function(error) {
            if (error) {
              console.log('Synchronization failed' + error);
            } else {
              console.log('Synchronization succeeded');
            }
          }; // after

          $timeout(function(){
            $location.path('/account/step1');
            $rootScope.authData = authData;
          },1); // redirect to step1
        } else { // user already existed
            $rootScope.authData = authData;
            authDataCallback
        } // if user existed or was created
      }); // checkIfUserExists
    }

    // ref.onAuth(authDataCallback);

    $scope.submit = function(formModel){
        $scope.authData = null;
        $scope.error = null;

        ref.authWithPassword(formModel, function(error, authData) {
            if (error) {
              $timeout(function() {
                console.log('Error: ', error)
                $scope.error = error;
                $scope.$apply()
              }, 1); // timeout
            } else {
                $scope.authData = authData;
                userExistsCheck(authData);
                $rootScope.loggedIn = true;
                $rootScope.displayName = usersFactory.getName(authData);
                $location.path('/account/profile');
                $timeout(function(){
                    $scope.$apply()
                },1); // timeout
            }
        })
    } // submit


  });
