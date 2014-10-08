(function () {
	'use strict';

	angular.module ('ei')
		.config(['$routeProvider', appRoutes]);

	function appRoutes ($routeProvider) {
		$routeProvider
			.when ('/', {
				templateUrl: 'app/layout/hello.html',
				controller: 'HelloController',
				controllerAs: 'Controller'
			})
			.when ('/hackernews', {
				templateUrl: 'app/layout/hackernews.html',
				controller: 'HackerNewsController',
				controllerAs: 'Controller'
			})
			.otherwise ({
				redirectTo: '/'
			});
	}
})();
