'use strict';

angular.module('charityApp')
  .controller('CharitiesCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.cards = [
            {name: 'clubs', symbol: '♣'},
            {name: 'diamonds', symbol: '♦'},
            {name: 'hearts', symbol: '♥'},
            {name: 'spades', symbol: '♠'}
        ];
  });
