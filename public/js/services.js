'use strict';

var app = angular.module('beerApp');

app.service('authService',function($http){
  var user;

console.log('authService');
this.login = function(userObj){
  return $http.put("/users/login",userObj);
}

this.register = function(userObj){
  return $http.post("/users/register",userObj);
}

this.logout = function(){
  return $http.delete("/users/logout");
}
});

app.service('profileService', function($http){

this.updateProfile = function(userObj){
  return $http.put("/users/profile/update", userObj);
}
});

app.service('beerService', function($http){
  this.getRandomBeer = function(){
    return $http.get("/beers/beer");
  }

  this.saveRandomBeer = function(beerData){
    return $http.post("/beers/beer", beerData);
  }
})