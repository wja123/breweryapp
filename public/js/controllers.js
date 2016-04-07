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
        if($state.current.name ==='register'){
        authService.register(userData).then(function(success){
            console.log(success);
            $state.go('member', {user:success.data});
        }, function(err){
            console.log(err);
        });
        }
        else{
        authService.login(userData).then(function(success){
            $state.go('member', {user:success.data});
        }, function(err){
            console.log(err);
        });
            
        }
    }
});

app.controller('memberCtrl', function($state, $scope, $stateParams, authService) {
    console.log('memberCtrl');
    console.log($stateParams);
    $(document).ready(function() {
        $(".button-collapse").sideNav();
    });

    $scope.logout = function(){
        authService.logout().then(function(success){
            $state.go('home');
        },function(err){
            console.log(err);
        })
    }
});

app.controller('profileCtrl', function($state, $scope, $stateParams, profileService, authService) {
    console.log('profileCtrl');
        console.log($stateParams.user);
    $(document).ready(function() {
        $(".button-collapse").sideNav();
    });

$scope.submitted = false;
    $scope.state = $state.current.name;

    $scope.updateUser = function(userData){
        $scope.submitted = true;
        console.log(userData);
        profileService.updateProfile(userData).then(function(success){
            $state.go('beerlist');
        }, function(err){
            $scope.submitted = false;
            console.log(err);
        });
    }

        $scope.logout = function(){
        authService.logout().then(function(success){
            $state.go('home');
        },function(err){
            console.log(err);
        })
    }

});



app.filter('titlecase', function() {
    return function(item) {
        return item[0].toUpperCase() + item.slice(1).toLowerCase();
    }
})