'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('overview.controller'));

  describe('overview controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var overviewCtrl = $controller('OverviewCtrl');
      expect(overviewCtrl).toBeDefined();
    }));

  });
});