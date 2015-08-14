'use strict';

function extend(base) {
    var parts = Array.prototype.slice.call(arguments, 1);
    parts.forEach(function (p) {
        if (p && typeof (p) === 'object') {
            for (var k in p) {
                if (p.hasOwnProperty(k)) {
                    base[k] = p[k];
                }
            }
        }
    });
    return base;
}

angular.module('charityApp')
  .factory('charitiesFactory', function ($http, $q) {

    var charitiesFactory = {}

    var ref = new Firebase("https://tinder-charity.firebaseio.com/");

    charitiesFactory.getCharities = function() {
      var deferred = $q.defer();
        var baseRef = new Firebase("https://tinder-charity.firebaseio.com/");
        var norm = new Firebase.util.NormalizedCollection(
          baseRef.child('charities'),
          baseRef.child('photos')
        );
        norm = norm.select( 'charities.name', 'photos.photo');

        ref = norm.ref();
        ref.on('value', function(snap) {
          deferred.resolve(snap.val());
          console.log('profile updated!', snap.key(), snap.val());
        });
        return deferred.promise;
    }

    // Public API here
    return charitiesFactory
  });
