'use strict';

angular.module('charityApp')
  .controller('NavbarCtrl', function ($scope, $location, usersFactory) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;

    var loggedIn = usersFactory.getLoggedInStatus()

    if (loggedIn) {
      var loginmenu = {
        'title': 'Logout',
        'link': '/logout'
      };

      $scope.menu.push(loginmenu)
      
    } else {
      var loginmenu = {
        'title': 'Login',
        'link': '/login'
      };

      $scope.menu.push(loginmenu)
    }

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });