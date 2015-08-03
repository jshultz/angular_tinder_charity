'use strict';

describe('Service: charitiesFactory', function () {

  // load the service's module
  beforeEach(module('charityApp'));

  // instantiate service
  var charitiesFactory;
  beforeEach(inject(function (_charitiesFactory_) {
    charitiesFactory = _charitiesFactory_;
  }));

  it('should do something', function () {
    expect(!!charitiesFactory).toBe(true);
  });

});
