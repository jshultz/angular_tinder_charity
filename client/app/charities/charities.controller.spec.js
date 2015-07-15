'use strict';

describe('Controller: CharitiesCtrl', function () {

  // load the controller's module
  beforeEach(module('charityApp'));

  var CharitiesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CharitiesCtrl = $controller('CharitiesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
