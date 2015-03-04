'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('login.controller'));

  describe('login controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var loginCtrl = $controller('LoginCtrl');
      expect(loginCtrl).toBeDefined();
    }));

  });
});