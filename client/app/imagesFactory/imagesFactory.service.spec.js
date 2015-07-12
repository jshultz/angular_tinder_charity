'use strict';

describe('Service: imagesFactory', function () {

  // load the service's module
  beforeEach(module('charityApp'));

  // instantiate service
  var imagesFactory;
  beforeEach(inject(function (_imagesFactory_) {
    imagesFactory = _imagesFactory_;
  }));

  it('should do something', function () {
    expect(!!imagesFactory).toBe(true);
  });

});
