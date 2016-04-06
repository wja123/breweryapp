'use strict';

var app = angular.module('myApp', ['ui.router']);

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

    $urlRouterProvider.otherwise('/');
});