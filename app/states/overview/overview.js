'use strict';

var app = angular.module('overview.controller', ['ngRoute','api.service','ui.bootstrap'])

var overviewController = function($http, apiService){
	var self = this;

	this.people = [];
	this.projects = [];
	this.whoami = {};
	this.type = 'add';

	this.days = ['mo','tu','we','th','fr'];

	this.formData = {};

	this.ongoingRequests = 0;

	this.toggleDay = function(day){
		if(this.formData.days == undefined){
			this.formData.days = [];
		}
		var position = this.formData.days.indexOf(day);
		if(position > -1){
			this.formData.days.splice(position,1);
		}else{
			this.formData.days.push(day);
		}
	}

	this.init = function(){
		apiService.whoami().then(function(result){
			self.whoami = result.data;
			self.formData.person_id = self.whoami.current_user.id;
			self.getProjects();
			self.getPeople();
		})
	}

	this.getPeople = function(){
		apiService.people().then(function(result){
			self.people = result.data.people;
		});
	}

	this.getProjects = function(){
		apiService.projects().then(function(result){
			self.projects = result.data.projects;
		});
	}

	this.submit = function(){
		switch(self.type){
			case 'add':
				self.addAssignments();
				break;
			case 'delete':
				self.removeOrMirgrateAssignments(false);
				break;
			case 'migrate':
				self.removeOrMirgrateAssignments(true);
				break;
			default:
		}
	}

	this.addAssignments = function(){
		var from = new Date(this.formData.start_date);
		var till = new Date(this.formData.end_date);

		while(from <= till){
			if(this.formData.days.indexOf(from.getDay()) > -1){
				console.log('need to add on day:', from);
				var assignment = {
					project_id: this.formData.project_id,
					person_id: this.formData.person_id,
					allocation: this.formData.allocation,
					start_date: from.getFullYear() + '-' + (parseInt(from.getMonth())+1) + '-' + from.getDate(),
					end_date: from.getFullYear() + '-' + (parseInt(from.getMonth())+1) + '-' + from.getDate(),
					notes: this.formData.notes
				}
				this.addAssignment(assignment);
			}
			from.setDate(from.getDate() + 1);
		}
	}

	this.removeOrMirgrateAssignments = function(migrate){
		apiService.assignments(this.formData.start_date, this.formData.end_date).success(function(data){
			for(var i in data.assignments){
				var assignment = data.assignments[i];
				if(assignment.person_id == self.formData.person_id &&
					assignment.project_id == self.formData.project_id
					){
					self.deleteAssignment(assignment);

					assignment.id = undefined;
					assignment.updated_at = undefined;
					assignment.updated_by_id = undefined;
					assignment.project_id = self.formData.new_project_id;
					self.addAssignment(assignment);
				}
			}
		});
	}

	this.addAssignment = function(assignment){
		this.ongoingRequests++;
		apiService.createAssignment(assignment).success(function(result){
			console.log(result);
			self.ongoingRequests--;
		}).error(function(data){
			console.log(data);
			self.ongoingRequests--;
		});
	}

	this.deleteAssignment = function(assignment){
		this.ongoingRequests++;
		apiService.deleteAssignment(assignment).success(function(result){
			console.log(result);
			self.ongoingRequests--;
		}).error(function(data){
			console.log(data);
			self.ongoingRequests--;
		});
	}

	this.init();

}

overviewController.$inject = ['$http','apiService'];
app.controller('OverviewCtrl', overviewController);