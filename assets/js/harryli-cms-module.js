'use strict';

/**
 * Route configuration for the CMS module.
 */
angular.module('harryliCMS', ['ui.router', 'CMS'])
.run(['$rootScope', function($rootScope){
    $rootScope.domain = 'harryli.com';
    $rootScope.imagePath = '//localhost:1337/';
    $rootScope.agentId = 'V49814';
}])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/dashboard');

    // Application routes
    $stateProvider
			
        .state('main', {
            url: '/',
            templateUrl: 'assets/pages/main.html',
            abstract: true,
			requireLogin: true

        })
		.state('main.dashboard', {
            url: 'dashboard', 
            templateUrl: 'assets/pages/dashboard.html',
			requireLogin: true,
            data: {
                title: 'Dashboard'  
            },
        })
        .state('main.property', {
			url: 'property',
            templateUrl: 'assets/shared/pages/property/overview.html',
            controller: 'PropertyListCtrl',
            data: {
                title: 'Property Listing'
            },
            requireLogin: true
		})
        .state('main.propertyAdd', {
			url: 'property/add',
            templateUrl: 'assets/shared/pages/property/add.html',
            controller: 'PropertyCreateCtrl',
            data: {
                title: 'Property Listing'
            },
            requireLogin: true
		})
        .state('main.propertyUpdate', {
			url: 'property/update/:id',
            templateUrl: 'assets/shared/pages/property/update.html',
            controller: 'PropertyEditCtrl',
			data: {
                parent: 'main.property',
                title: 'Property Listing'
            },
            resolve: {
                propertyToBeUpdated: ['$stateParams', 'Property', function($stateParams, Property){
                    var propertyId = $stateParams.id;
                    return Property.get({Id: propertyId});
                }]
            },
            requireLogin: true
		})
		.state('main.news', {
			url: 'news',
            templateUrl: 'assets/pages/news/overview.html',
            controller: 'ArticleListCtrl',
            data: {
                articleFilter: 'news',
                title: 'Property News'
            },
            requireLogin: true
		})
		.state('main.newsAdd', {
			url: 'news/add',
            templateUrl: 'assets/pages/news/add.html',
            controller: 'ArticleCreateCtrl',
			data: {
                articleFilter: 'news',
                parent: 'main.news',
                title: 'Property News'
            },
            resolve: {
                templates: ['harryliConstants', function(harryliConstants){
                    return harryliConstants.NEWS_TEMPLATES;
                }]
            },
            requireLogin: true
		})
		.state('main.newsUpdate', {
			url: 'news/update/:id',
            templateUrl: 'assets/pages/news/update.html',
            controller: 'ArticleEditCtrl',
			data: {
                parent: 'main.news',
                title: 'Property News'
            },
            resolve: {
                articleToBeUpdated: ['$stateParams', 'Article', function($stateParams, Article){
                    var articleId = $stateParams.id;
                    return Article.get({Id: articleId});
                }],
                templates: ['harryliConstants', function(harryliConstants){
                    return harryliConstants.NEWS_TEMPLATES;
                }]
            },
            requireLogin: true
		});
}]);