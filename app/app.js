'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'login.controller',
  'overview.controller',
  'api.service'
]).
config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/overview', {
    templateUrl: 'states/overview/overview.html',
  });

  $routeProvider.when('/login', {
    templateUrl: 'states/login/login.html',
  });

  $routeProvider.otherwise({redirectTo: '/login'});


}]);
