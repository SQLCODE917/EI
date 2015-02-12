(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsItem', [
			'$log',
			'hackerNewsItemCacheService',
			getHackerNewsItem
			]);

	function getHackerNewsItem (
		$log, 
		cacheService
		) {

		/*
		 * args: [firebaseObject]
		 */
		return function (jExpression, args) {
			var firebaseObject = args[0];
			return cacheService.find (firebaseObject.$value);
		};	
	}
})();
