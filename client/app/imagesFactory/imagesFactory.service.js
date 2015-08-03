'use strict';

angular.module('charityApp')
  .factory('imagesFactory', function () {
    var imagesFactory = {}

    var ref = new Firebase("https://tinder-charity.firebaseio.com/");

    charitiesFactory.getCharities = function() {
      var deferred = $q.defer();
        // ref.child('users').child(authData.uid).on("value", function(snapshot) {
        //     if (snapshot) {
        //         deferred.resolve(snapshot.val());
        //     } else {
        //         deferred.resolve(null)
        //     }
        // });
        return deferred.promise;
    }

    // Public API here
    return imagesFactory;
  });
