(function () {
	'use strict';

	angular.module ('ei.services')
		.factory ('hackerNewsItemCacheService', [
			'$q',
			'$log',
			'hackerNewsModel',
			'hackerNewsItemService',
			hackerNewsItemCacheService
		]);

	function hackerNewsItemCacheService (
		$q, 
		$log, 
		hackerNewsModel,
		hackerNewsItemService
		) {
		var api = {
			find: find,
			save: save
		};

		return api;

		function find (id) {
			var deferred = $q.defer ();
			var cachedItem = hackerNewsModel.getItem (id);

			if (cachedItem !== hackerNewsModel.nullItem ()) {
				return cachedItem;
			} else {
				hackerNewsItemService (id)
					.then (function (hackerNewsItem) {
						deferred.resolve (api.save (hackerNewsItem));
					})
					.catch (function (error) {
						$log.error ('Failed to get HN Item ' + id + "!");
						$log.error (error);	
					});
			}

			return deferred.promise;
		}

		function save (item) {
			hackerNewsModel.setItem (item);
			
			// don't mess with 'this'
			return api.find (item.id);
		}
	}
})();
