'use strict';

/**
 * Route configuration for the CMS module.
 */
angular.module('CMS').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/dashboard');

    // Application routes
    $stateProvider
		.state('login', {
			url: '/login',
            templateUrl: 'assets/shared/pages/login.html',
			requireLogin: false
		})
        .state('main', {
            url: '/',
            templateUrl: 'assets/pages/main.html',
			requireLogin: true

        })
		.state('main.dashboard', {
            url: 'dashboard', 
            templateUrl: 'assets/pages/dashboard.html',
			requireLogin: false
        })
        .state('main.tables', {
            url: 'tables', 
            templateUrl: 'assets/pages/table.html',
			requireLogin: true
        });
}]);