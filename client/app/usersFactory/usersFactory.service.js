'use strict';

angular.module('charityApp')
  .factory('usersFactory', function ($http, $q) {

    var usersFactory = {}

    var ref = new Firebase("https://tinder-charity.firebaseio.com/");

    usersFactory.addUserToGroup = function(user, group_id) {
        var deferred = $q.defer();
        var groupName = factory.getGroupName(group_id)
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

    // Tests to see if /users/<userId> has any data.
    usersFactory.checkIfUserExists = function(authData) {
      var deferred = $q.defer();
      ref.child('users').child(authData.uid).once('value', function(snapshot) {
        var exists = (snapshot.val() !== null);
        if (!exists) {
          console.log('created')
          usersFactory.userCreateCallback(authData);
          deferred.resolve('created')
        } else {
                    console.log('existed')
          deferred.resolve('existed')
        }
      });
      return deferred.promise;
    } // checkIfUserExists

    usersFactory.createGroup = function(group) {
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
    }, // createAccount

    usersFactory.getAccessLevel = function(authData) {
        var deferred = $q.defer();
        // Attach an asynchronous callback to read the data at our posts reference
        ref.child('users').child(authData.uid).on("value", function(snapshot) {
            if (snapshot) {
                deferred.resolve(snapshot.val().user_level);
            } else {
                deferred.resolve(null)
            }
        });
        return deferred.promise;
      }, // getAccessLevel

    usersFactory.getName = function(authData) {
        if (authData) {
          switch(authData.provider) {
          case 'password':
            return authData.password.email.replace(/@.*/, '');
          case 'twitter':
            return authData.twitter.displayName;
          case 'facebook':
            return authData.facebook.displayName;
          }
        }
      }, // getName

    usersFactory.loginAccount = function(data) {
      var deferred = $q.defer();
      ref.authWithPassword(data, function(error, authData) {
        if (error) {
          deferred.resolve(error)
          console.log("Login Failed!", error);
        } else {
          deferred.resolve('success')
          console.log("Authenticated successfully with payload:", authData);
        }
      });
      return deferred.promise;
    }, // loginAccount

    usersFactory.userCreateCallback = function(authData) {
        if (authData) {
                  ref.child('users').once('value', function(snapshot) {
                      var child = snapshot.hasChildren()
                      if (child == false) {
                          var group_id = usersFactory.createGroup('first')
                          var user_level = 1
                          console.log('no users')
                      } else {
                          var group_id = null;
                          var user_level = 10;
                          console.log('there are users')
                      }
                      if (authData.provider == 'facebook') {
                        var profile_photo = authData.facebook.cachedUserProfile.picture.data.url;
                      } // get Facebook profile photo

                      if (authData.provider == 'password') {
                        var profile_photo = ''
                      }

                      if (authData.provider == 'twitter') {
                        var profile_photo = authData.twitter.cachedUserProfile.profile_image_url_https;
                      } // get Twitter profile photo

                      ref.child("users").child(authData.uid).set({
                          provider: authData.provider,
                          full_name: usersFactory.getName(authData),
                          user_level: user_level,
                          photo: profile_photo
                      });

                      if (child == usersFactory) {
                        groupName = usersFactory.getGroupName(group_id)
                        ref.child('users').child(authData.uid).child('group').child(group_id).set({
                            id: group_id,
                            name: groupName
                          })
                      }

                      if (child != false) {
                        usersFactory.getGroupByName('users').then(function(response) {
                          console.log('response', response);
                          ref.child('users').child(authData.uid).child('group').child(response.id).set({
                            id: response.id,
                            name: 'users'
                          })
                        });

                      }


                  });
          // save the user's profile into Firebase so we can list users,
          // use them in Security and Firebase Rules, and show profiles
          return true
          }
      } // userCreateCallback





    // Public API here
    return usersFactory;
  });
