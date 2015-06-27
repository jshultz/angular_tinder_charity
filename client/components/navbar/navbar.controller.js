'use strict';

angular.module('charityApp')
  .controller('NavbarCtrl', function ($scope, $location, usersFactory, $firebaseObject, $firebaseAuth) {

    var ref = new Firebase("https://tinder-charity.firebaseio.com/");

    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "data");

    var auth = $firebaseAuth(ref);

    $scope.auth = $firebaseAuth(ref);

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'About',
      'link': '/about'
    }];

    $scope.isCollapsed = true;

    $scope.logout = function() {
      ref.unauth();
      $scope.loggedIn = false;
    } // logout

    $scope.loggedIn = usersFactory.getLoggedInStatus()

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });