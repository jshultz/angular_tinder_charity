'use strict';

angular.module('charityApp')
  .controller('ProfileCtrl', function ($scope, usersFactory, user, API, imagesFactory,$timeout, $location, flash) {

    if (user == false) {
      $timeout(function(){
          flash.error = "You must be logged in to view this page. ";
          $location.path('/login');
      },1); // timeout
    }

    $scope.uploadLogo = function(logoFile) {
      API.uploadLogo(logoFile).success(function (uploadResponse) {
          // Handle response from server
        $scope.charityPhoto = uploadResponse.filename;
        usersFactory.addPhotoForUser(user, uploadResponse.filename);
      }).error(function (error) {
        // Handle error from server
        console.log(error);
      });
    };

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

        $scope.menu = [{
          'title': 'Edit Charity Profile',
          'link': '/account/charity'
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
