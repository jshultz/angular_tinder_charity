'use strict';

angular.module('charityApp')
  .controller('ProfileCtrl', function ($scope, usersFactory, user) {
    $scope.message = 'Hello';

  usersFactory.getProfile(user).then(function(response){
    if (response != null) {
      var profile = response;
      $scope.profile = response;
    } else {
      var profile = false;
      $scope.profile = '';
    } // if (response != null)

    // we've got a sweet response, let's find out if it's a charity or not.
    if (response.charity) {
      $scope.test = 'TEST TETST ETS'

      $scope.menu = [{
        'title': 'Edit Charity Profile',
        'link': '/account/profile'
      }, {
        'title': 'About',
        'link': '/about'
      }];

    } else {

      $scope.menu = [{
      'title': 'Edit your Profile',
        'link': '/account/profile'
      }, {
        'title': 'About',
        'link': '/about'
      }];

    } // if (response.charity)


  }) // getProfile(user)


});
