var module = angular.module('api.service', []);

module.factory('apiService', function($http) {

  var apiService = {};

  apiService.url = 'https://api.forecastapp.com';

  apiService.whoami = function(){
    return callApi('/whoami','get');
  }

  apiService.people = function(){
    return callApi('/people', 'get');
  }

  apiService.projects = function(id){
    return callApi('/projects/','get');
  }

  apiService.assignments = function(start, end){
    return callApi('/assignments?start_date='+start+'&end_date='+end,'get');
  }

  apiService.createAssignment = function(assignment){
    return callApi('/assignments','post', assignment);
  }

  apiService.deleteAssignment = function(assignment){
    return callApi('/assignments/'+assignment.id, 'delete');
  }

  callApi = function(url, method, data){
    var req = {
      method: method,
      url: apiService.url + url,
      headers: getHeaders(),
    }

    if(data != undefined){
      req.data = {assignment: data};
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
