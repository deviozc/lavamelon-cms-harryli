'use strict';

/**
 * Route configuration for the CMS module.
 */
angular.module('harryliCMS', ['ui.router', 'lbServices', 'CMS'])
.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/dashboard');

    // Application routes
    $stateProvider
		
		
        .state('main', {
            url: '/',
            templateUrl: 'assets/pages/main.html',
			requireLogin: true

        })
		.state('main.dashboard', {
            url: 'dashboard', 
            templateUrl: 'assets/pages/dashboard.html',
			requireLogin: true
        })
		.state('main.news', {
			url: 'news',
            templateUrl: 'assets/pages/news/overview.html',
            controller: 'ArticleListCtrl',
            data: {
                articleFilter: 'news'  
            },
            requireLogin: true
		})
		.state('main.newsAdd', {
			url: 'news/add',
            templateUrl: 'assets/pages/news/add.html',
            controller: 'ArticleCreateCtrl',
			data: {
                articleFilter: 'news',
                parent: 'main.news'
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
                parent: 'main.news'
            },
            resolve: {
                articleToBeUpdated: ['$stateParams', 'Article', function($stateParams, Article){
                    var articleId = $stateParams.id;
                    return Article.get({id: articleId});
                }],
                templates: ['harryliConstants', function(harryliConstants){
                    return harryliConstants.NEWS_TEMPLATES;
                }]
            },
            requireLogin: true
		});
}]);