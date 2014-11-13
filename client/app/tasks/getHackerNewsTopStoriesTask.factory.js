(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsTopstories', [
		   '$log',
	   		'hackerNewsTopstoriesService',
	 		getHackerNewsTopstoriesTask
		]);

	function getHackerNewsTopstoriesTask (
		$log,
		topstoriesService
		) 
	{
		return function (jExpression) {
			return topstoriesService();	
		};
	}

})();
