'use strict';

angular.module('charityApp')
  .factory('charitiesFactory', function () {

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
    return charitiesFactory
  });
