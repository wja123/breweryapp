'use strict';

var app = angular.module('beerApp');

app.controller('mainCtrl', function($state, $scope) {
    console.log('mainCtrl');
    $(document).ready(function() {
        $(".button-collapse").sideNav();
    });
});

app.controller('authCtrl', function($state, $scope, authService) {
    $(document).ready(function() {
        $(".button-collapse").sideNav();
    });
    console.log('authCtrl');
            $scope.submitted = false;
    $scope.state = $state.current.name;

    $scope.submitUser = function(userData){
        $scope.submitted = true;
        console.log(userData);
        if($state.current.name ==='register'){
        authService.register(userData).then(function(success){
            $state.go('member');
        }, function(err){
            console.log(err);
        });
        }
        else{
        authService.login(userData).then(function(success){
            $state.go('member');
        }, function(err){
            console.log(err);
        });
            
        }
    }
});

app.controller('memberCtrl', function($state, $scope) {
    console.log('memberCtrl');
    $(document).ready(function() {
        $(".button-collapse").sideNav();
    });
});

app.controller('profileCtrl', function($state, $scope, profileService) {
    console.log('profileCtrl');
    $(document).ready(function() {
        $(".button-collapse").sideNav();
    });

$scope.submitted = false;
    $scope.state = $state.current.name;

    $scope.updateUser = function(userData){
        $scope.submitted = true;
        console.log(userData);
        profileService.updateUser(userData).then(function(success){
            $state.go('member');
        }, function(err){
            $scope.submitted = false;
            console.log(err);
        });
    }

});



app.filter('titlecase', function() {
    return function(item) {
        return item[0].toUpperCase() + item.slice(1).toLowerCase();
    }
})