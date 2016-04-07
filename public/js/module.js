'use strict';

var app = angular.module('beerApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'html/home.html',
            controller: 'mainCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'html/auth.html',
            controller: 'authCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'html/auth.html',
            controller: 'authCtrl'
        })
        .state('member', {
            url: '/member',
            templateUrl: 'html/member.html',
            controller: 'memberCtrl',
            params:{user:null}
        })
        .state('profile', {
            url: '/profile',
            templateUrl: 'html/profile.html',
            controller: 'profileCtrl',
            params:{user:null}
        })
                .state('randombeer', {
            url: '/randombeer',
            templateUrl: 'html/randombeer.html',
            controller: 'beerCtrl',
            params:{user:null}
        })

    $urlRouterProvider.otherwise('/');
});