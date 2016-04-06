'use strict';

var app = angular.module('beerApp');

app.service('authService',function($http){
console.log('authService');
this.login = function(userObj){
  return $http.put("/users/login",userObj);
}

this.register = function(userObj){
  return $http.post("/users/register",userObj);
}
});

app.service('profileService', function($http){

this.updateProfile = function(userObj){
  return $http.put("/users/profile/update", userObj);
}
});