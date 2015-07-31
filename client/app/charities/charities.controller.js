'use strict';

angular.module('charityApp')
  .controller('CharitiesCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.swingStackConfig = {
        maxRotation: 1
      };

    $scope.cards = [
            {name: 'clubs', symbol: '♣'},
            {name: 'diamonds', symbol: '♦'},
            {name: 'hearts', symbol: '♥'},
            {name: 'spades', symbol: '♠'}
        ];

        $scope.isThrowOut = function (offset, elementWidth) { 
            return $scope.throwOutConfidence(offset, elementWidth) == 1; 
        };
        $scope.throwOutConfidence = function (offset, elementWidth) { 
            return Math.min(Math.abs(offset) / 30, 1); 
        };

        $scope.throwout = function (eventName, eventObject) {
            console.log('throwout', eventObject);
        };

        $scope.throwoutleft = function (eventName, eventObject) {
            console.log('throwoutleft', eventObject);
        };

        $scope.throwoutright = function (eventName, eventObject) {
            console.log('throwoutright', eventObject);
        };

        $scope.throwin = function (eventName, eventObject) {
            console.log('throwin', eventObject);
        };

        $scope.dragstart = function (eventName, eventObject) {
            console.log('dragstart', eventObject);
        };

        $scope.dragmove = function (eventName, eventObject) {
            console.log('dragmove', eventObject);
        };

        $scope.dragend = function (eventName, eventObject) {
            console.log('dragend', eventObject);
        };
  });
