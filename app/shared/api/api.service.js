var module = angular.module('api.service', []);

module.factory('apiService', function($http) {

  var apiService = {};

  apiService.url = 'https://api.forecastapp.com';

  apiService.whoami = function(){
    return getApi('/whoami');
  }

  apiService.people = function(){
    return getApi('/people');
  }

  apiService.projects = function(id){
    return getApi('/projects/');
  }

  apiService.assignments = function(start, end){
    return getApi('/assignments?start_date='+start+'&end_date='+end);
  }

  apiService.createAssignment = function(assignment){
    return postApi('/assignments', assignment);
  }

  apiService.deleteAssignment = function(assignment){
    return deleteApi('/assignments/'+assignment.id);
  }


  getApi = function(url){
    var req = {
      method: 'GET',
      url: apiService.url + url,
      headers: getHeaders(),
    }
    return $http(req);
  }

  postApi = function(url, data){
    var req = {
      method: 'POST',
      url: apiService.url + url,
      headers: getHeaders(),
      data: {assignment: data}
    }
    return $http(req);
  }

  deleteApi = function(url){
    var req = {
      method: 'DELETE',
      url: apiService.url + url,
      headers: getHeaders(),
    }
    return $http(req);
  }

  getHeaders = function(){
    return {
        'authorization': 'Bearer ' + window.localStorage.getItem('session'),
        'forecast-account-id' : window.localStorage.getItem('account')
      };
  }

  return apiService;

});
