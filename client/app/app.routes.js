(function () {
	'use strict';

	angular.module('ei')
		.config(['$routeProvider', appRoutes]);

	function appRoutes( $routeProvider ) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/layout/hello.html',
				controller: 'HelloController',
				controllerAs: 'Controller'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
})();
