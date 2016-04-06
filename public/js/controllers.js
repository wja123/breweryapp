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
    $scope.state = $state.current.name;

    $scope.submitUser = function(userData){
        
    }
});



app.filter('titlecase', function() {
    return function(item) {
        return item[0].toUpperCase() + item.slice(1).toLowerCase();
    }
})