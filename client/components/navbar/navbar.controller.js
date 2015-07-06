'use strict';

angular.module('charityApp')
  .controller('NavbarCtrl', function($scope, $location, usersFactory, $firebaseObject, $firebaseAuth) {

    var ref = new Firebase("https://tinder-charity.firebaseio.com/");

    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "data");

    var auth = $firebaseAuth(ref);

    $scope.auth = $firebaseAuth(ref);

    $scope.loggedIn = usersFactory.getLoggedInStatus()

    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }, {
      'title': 'About',
      'link': '/about'
    }];

    if ($scope.loggedIn) {
      var loginmenu = [{
        'title': 'Account',
        'link': '/account'
      }, {
        'title': 'Logout',
        'link': '/logout'
      }];
    } else {
      var loginmenu = [{
        'title': 'Login',
        'link': '/login'
      }];
    }

    angular.forEach(loginmenu, function(value, key) {
      this.push(value)
    }, $scope.menu);

    $scope.isCollapsed = true;

    $scope.logout = function() {
        ref.unauth();
        $scope.loggedIn = false;
      } // logout


    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });