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
        ref.child('charities').on("value", function(charityShot) {
            debugger
            var userId = charityShot.val().id; // line 1 (results like 1,2,3,4,5,6)
            ref.child('photos').child(userId).once("value", function(photoShot) {
                console.log(id + ":" + mediaSnap.val().name);
            })
            // if (snapshot) {
            //     // deferred.resolve(snapshot.val());
            //     console.log(snapshot.val());
            // } else {
            //     console.log("The read failed: " + errorObject.code);
            //     deferred.resolve(null)
            // }
        });
        return deferred.promise;
    }

    // Public API here
    return charitiesFactory
  });
