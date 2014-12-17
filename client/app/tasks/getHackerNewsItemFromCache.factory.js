(function () {
	'use strict';

	angular.module ('ei')
		.factory ('getHackerNewsItem', [
			'$log',
			'hackerNewsItemCacheService',
			'hackerNewsItemService',
			getHackerNewsItem
			]);

	function getHackerNewsItem (
		$log, 
		cacheService,
		itemService
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
