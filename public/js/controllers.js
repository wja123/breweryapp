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

    $scope.submitUser = function(userData) {
        $scope.submitted = true;
        if ($state.current.name === 'register') {
            authService.register(userData).then(function(success) {
                $state.go('member', {
                    user: success.data
                });
            }, function(err) {
                console.log(err);
            });
        } else {
            authService.login(userData).then(function(success) {
                $state.go('member', {
                    user: success.data
                });
            }, function(err) {
                console.log(err);
            });

        }
    }
});

app.controller('memberCtrl', function($state, $scope, $stateParams, authService) {
    console.log('memberCtrl');
    $scope.user = $stateParams.user;
    $(document).ready(function() {
        $(".button-collapse").sideNav();
    });

    $scope.logout = function() {
        authService.logout().then(function(success) {
            $state.go('home');
        }, function(err) {
            console.log(err);
        })
    }
});

app.controller('profileCtrl', function($state, $scope, $stateParams, profileService, authService) {
    $scope.submitted = false;
    console.log($stateParams);
    $scope.userData = $stateParams.user;
    $scope.user = $stateParams.user;
    $(document).ready(function() {
        $(".button-collapse").sideNav();
    });

    $scope.state = $state.current.name;

    $scope.updateUser = function(userData) {
        $scope.submitted = true;
        console.log(userData);
        profileService.updateProfile(userData).then(function(success) {
            $state.go('beerlist');
        }, function(err) {
            $scope.submitted = false;
            console.log(err);
        });
    }

    $scope.logout = function() {
        authService.logout().then(function(success) {
            $state.go('home');
        }, function(err) {
            console.log(err);
        })
    }

});


app.controller('beerCtrl', function($state, $scope, $stateParams, profileService, authService, beerService) {
    $scope.submitted = false;
    console.log($stateParams);
    $scope.userData = $stateParams.user;
    $scope.user = $stateParams.user;
    $(document).ready(function() {
        $(".button-collapse").sideNav();
    });

    $scope.state = $state.current.name;
    getBeer();

    $scope.newBeer = function() {
        getBeer();
    }

    $scope.submitted = true;

    function getBeer() {

        beerService.getRandomBeer().then(function(success) {
            console.log(success.data);
            $scope.randombeer = success.data.data;
        }, function(err) {
            $scope.submitted = false;
            console.log(err);
            return;
        });
    }
    $scope.addBeer = function(beer){
        beer.beerdata = angular.copy($scope.randombeer);
        beer.beerDbId = $scope.randombeer.id;
        beer.uerId = $scope.user._id;
        beerService.saveRandomBeer(beer).then(function(success){
            $scope.randomBeer ={};
            getBeer();
        },
        function(err){
            console.log(err);
        })
    }

    $scope.logout = function() {
        authService.logout().then(function(success) {
            $state.go('home');
        }, function(err) {
            console.log(err);
        })
    }

});



app.filter('titlecase', function() {
    return function(item) {
        return item[0].toUpperCase() + item.slice(1).toLowerCase();
    }
})