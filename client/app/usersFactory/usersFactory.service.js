'use strict';

angular.module('charityApp')
  .factory('usersFactory', function ($http, $q) {

    var usersFactory = {}

    var ref = new Firebase("https://tinder-charity.firebaseio.com/");

    usersFactory.addUserToGroup = function(user, group_id) {
        var deferred = $q.defer();
        var groupName = factory.getGroupName(group_id)
        var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
        ref.child('users').orderByChild('email').equalTo(user.email).on('child_added', function(snapshot) {
          theuser = snapshot.key()
          ref.child('users').child(theuser).child('group').child(group_id).set({
              id: group_id,
              name: groupName
            }, function(error) {
              if (error) {
                console.log("Synchronization failed " + error);
              } else {
                console.log("Synchronization succeeded");
                ref.child('groups').orderByChild('name').equalTo(groupName).on('child_added', function(snapshot) {
                  deferred.resolve(snapshot.val());
                })
              }
            })
          }
        )

        return deferred.promise;

    }, // addUserToGroup

    usersFactory.createGroup = function(group) {
        var ref = new Firebase("https://rails-angular-fireba.firebaseio.com");
        if (group == 'first') {
          var guid = factory.createGUID();
          ref.child('groups').child(guid).set({
            id: guid,
            name: 'admin'
          })
          var anotherguid = factory.createGUID();
          ref.child('groups').child(anotherguid).set({
            id: anotherguid,
            name: 'users'
          })

          return guid;

        } else {
          if (group.id) {
            ref.child('groups').child(group.id).set({
              id: group.id,
              name: group.name
            })
          } else {
            var guid = factory.createGUID();
            ref.child('groups').child(guid).set({
              id: guid,
              name: group
            })
          }
          return factory.getGroupList();
        }
    }, // createGroup

    usersFactory.createGUID = function() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }, // createa a pseudo createGUID

     // Simple POST request example (passing data) :
    usersFactory.createAccount = function(data) {
      var deferred = $q.defer();
      ref.createUser(data, function(error, userData) {
        if (error) {
          deferred.resolve(error)
          console.log("Error creating user:", error);
        } else {
          deferred.resolve('created')
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
      return deferred.promise;
    }





    // Public API here
    return usersFactory;
  });
