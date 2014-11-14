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
		 * Precondition: 'lastReturn' in scope
		 * jExpression:
		 * 	{ 'getHackerNewsItem': [firebaseObject]}
		 * 	firebaseObject:
		 * 		{ $value: 8602936, $id: "0", $priority: null }
		 */
		return function (jExpression) {
			var args = jExpression.getHackerNewsItem;

			// there can be only 1 parameter for this
			if (args.lastIndexOf ('lastReturn') !== -1) {
				return itemService (this.lastReturn.$value);
			}
			return itemService (args[0]);
		};	
	}
})();
