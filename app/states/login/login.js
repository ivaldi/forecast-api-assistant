'use strict';

var app = angular.module('login.controller', ['ngRoute'])

var loginController = function($location, $http){

	this.session = window.localStorage.getItem('session');
	this.account = window.localStorage.getItem('account');

	this.login = function(){
		window.localStorage.setItem('session',this.session);
		window.localStorage.setItem('account',this.account);

		$location.path('/overview');
	}

	this.init = function(){
		//TODO: get token to create real login
		// $http.get('https://id.getharvest.com/sessions/new').then(function(data){
		// 	console.log(data);
		// });
	}

	// this.init();

}

loginController.$inject = ['$location','$http'];
app.controller('LoginCtrl', loginController);