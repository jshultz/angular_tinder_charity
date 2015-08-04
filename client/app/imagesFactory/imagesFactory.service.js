'use strict';

angular.module('charityApp')
  .factory('imagesFactory', function () {
    var imagesFactory = {}

    var ref = new Firebase("https://tinder-charity.firebaseio.com/");

    // Public API here
    return imagesFactory;
  });
